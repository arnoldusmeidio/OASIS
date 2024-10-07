import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { emailVerificationSchema, loginSchema, registerSchema } from "../schemas/auth-schema";
import { ZodError } from "zod";
import { authorizationUrl, oauth2Client } from "@/config/google";
import { google } from "googleapis";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email confirmation
export async function emailVerification(req: Request, res: Response, next: NextFunction) {
   try {
      const parsedData = emailVerificationSchema.parse(req.body);
      const { email } = parsedData;

      const existingUser = await prisma.user.findUnique({
         where: { email },
      });

      if (existingUser) return res.status(409).json({ message: "Email has already been used", ok: false });

      // Generate confirmation token
      const token = crypto.randomBytes(20).toString("hex");
      const confirmationLink = `${process.env.CLIENT_PORT}/register/select-role?token=${token}&email=${email}`;

      const { error } = await resend.emails.send({
         from: "Oasis <oasis.app@resend.dev>",
         to: [email],
         subject: "Email Confirmation (OASIS)",
         html: `<p> Please confirm your email to continue the registration process by clicking on the following link: <a href="${confirmationLink}">Confirmation Link</a></p>`,
      });

      if (error) {
         return res.status(400).json({ message: "Something went wrong", ok: false });
      }

      return res
         .status(200)
         .json({ message: "Please check your email inbox/spam folder for the confirmation link", ok: true });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}

// Register user
export async function register(req: Request, res: Response, next: NextFunction) {
   try {
      const parsedData = registerSchema.parse(req.body);
      const { name, email, password, role } = parsedData;
      const selectRole = {
         ...(role == "customer" ? { customer: { create: {} } } : role == "tenant" ? { tenant: { create: {} } } : {}),
      };
      const existingUser = await prisma.user.findUnique({
         where: { email },
      });

      if (existingUser) return res.status(409).json({ message: "Email has already been used", ok: false });

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword,
            accountProvider: "CREDENTIALS",
            ...selectRole,
         },
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
         .json({ message: "Login success", ok: true });
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

// GOOGLE Callback login
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
         return res.status(401).json({ message: "Invalid User", ok: false });
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

      if (existingUser?.tenant !== null) {
         role = "tenant";
      } else if (existingUser?.customer !== null) {
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
      }).redirect(`${process.env.CLIENT_PORT}/`);
   } catch (error) {
      next(error);
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
