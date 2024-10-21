import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, newPasswordSchema, registerSchema, resetSchema } from "../schemas/auth-schema";
import { ZodError } from "zod";
import { authorizationUrl, oauth2Client } from "@/config/google";
import { google } from "googleapis";
import { getVerificationTokenByToken } from "@/lib/verification-token";
import { RequestWithUserId } from "@/types";
import { getPasswordResetTokenByToken } from "@/lib/password-reset-token";

// Register user
export async function register(req: Request, res: Response, next: NextFunction) {
   try {
      const parsedData = registerSchema.parse(req.body);
      const { name, password, role, token } = parsedData;
      const selectRole = {
         ...(role == "customer" ? { customer: { create: {} } } : role == "tenant" ? { tenant: { create: {} } } : {}),
      };
      const existingToken = await getVerificationTokenByToken(token);

      if (!existingToken) return res.status(400).json({ message: "Invalid Token", ok: false });

      const existingUser = await prisma.user.findUnique({
         where: { email: existingToken.email },
      });

      if (existingUser) return res.status(409).json({ message: "Email has already been used", ok: false });

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      await prisma.user.create({
         data: {
            name,
            email: existingToken.email,
            password: hashedPassword,
            accountProvider: "CREDENTIALS",
            ...selectRole,
         },
      });

      await prisma.verificationToken.delete({
         where: { id: existingToken.id },
      });

      return res.status(201).json({ message: "User successfully created", ok: true });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}

// Login
export async function login(req: Request, res: Response, next: NextFunction) {
   try {
      const parsedData = loginSchema.parse(req.body);
      const { email, password, rememberMe } = parsedData;

      const user = await prisma.user.findUnique({
         where: { email, accountProvider: "CREDENTIALS" },
         include: {
            tenant: true,
            customer: true,
         },
      });

      if (!user) return res.status(404).json({ message: "Invalid Email / Password", ok: false });

      const isValidPassword = await compare(password, user?.password!);

      if (!isValidPassword) return res.status(401).json({ message: "Invalid Email / Password", ok: false });

      let role = "";

      if (user.tenant !== null) {
         role = "tenant";
      } else {
         role = "customer";
      }

      const jwtPayload = { name: user?.name, email, id: user?.id, role };
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string, {
         expiresIn: rememberMe ? "30d" : "1d",
      });

      return res
         .cookie("token", token, {
            httpOnly: true,
            expires: rememberMe
               ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
               : new Date(Date.now() + 1000 * 60 * 60 * 24),
            sameSite: "none", // need to change on production to be true
            secure: true, // turn off while check on thunderclient
         })
         .status(200)
         .json({ message: "Login success", ok: true, role });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}

// GOOGLE Login
export async function googleLogin(req: Request, res: Response) {
   res.redirect(authorizationUrl);
}

// GOOGLE Callback login TODO: handle return error
export async function googleLoginCallback(req: Request, res: Response, next: NextFunction) {
   try {
      const { code } = req.query;
      const { tokens } = await oauth2Client.getToken(code as string);

      oauth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({
         auth: oauth2Client,
         version: "v2",
      });

      const { data } = await oauth2.userinfo.get();

      if (!data.email || !data.name || !data.id) {
         return res.redirect(`${process.env.CLIENT_PORT}/login?error=Invalid%20User`);
      }

      const existingUser = await prisma.user.findUnique({
         where: { email: data.email },
         include: { customer: true, tenant: true },
      });

      if (existingUser) {
         if (existingUser?.accountProvider !== "GOOGLE")
            return res.redirect(
               `${process.env.CLIENT_PORT}/register?error=Email%20has%20already%20been%20used%20with%20another%20provider`,
            );
      }

      if (!existingUser) {
         await prisma.user.create({
            data: {
               id: data.id,
               name: data.name,
               email: data.email,
               accountProvider: "GOOGLE",
               pictureUrl: data.picture,
            },
         });
      }

      let role = null;

      if (existingUser?.tenant) {
         role = "tenant";
      } else if (existingUser?.customer) {
         role = "customer";
      }

      const jwtPayload = { name: data.name, email: data.email, id: data.id, role };
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string, {
         expiresIn: "30d",
      });

      res.cookie("token", token, {
         httpOnly: true,
         expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
         sameSite: "none", // need to change on production to be true
         secure: true, // turn off while check on thunderclient
      }).redirect(
         role == "tenant"
            ? `${process.env.CLIENT_PORT}/tenant?success=Login%20success`
            : `${process.env.CLIENT_PORT}/?success=Login%20success`,
      );
   } catch (error) {
      return res.redirect(`${process.env.CLIENT_PORT}/login?error=Something%20went%20wrong!`);
   }
}

// Update user password
export async function updateUserPassword(req: Request, res: Response, next: NextFunction) {
   try {
      const parsedData = newPasswordSchema.parse(req.body);
      const { token, password } = parsedData;

      const existingToken = await getPasswordResetTokenByToken(token);
      if (!existingToken) return res.status(404).json({ message: "Invalid Token", ok: false });

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) return res.status(400).json({ message: "Token has expired", ok: false });

      const user = await prisma.user.findUnique({
         where: {
            email: existingToken.email,
         },
      });

      if (!user)
         return res.status(404).json({
            message: "User not found",
            ok: false,
         });

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      await prisma.user.update({
         where: {
            email: existingToken.email,
         },
         data: {
            password: hashedPassword,
         },
      });

      await prisma.passwordResetToken.delete({
         where: { id: existingToken.id },
      });

      res.status(200).json({ message: "Password updated successfully", ok: true });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}

// Logout
export async function logout(req: Request, res: Response, next: NextFunction) {
   try {
      res.clearCookie("token");

      return res.status(200).json({ message: "Successfully logged out.", ok: true });
   } catch (error) {
      next(error);
   }
}
