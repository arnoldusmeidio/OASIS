import { generatePasswordResetToken, generateVerificationToken } from "@/lib/token";
import { emailVerificationSchema, resetSchema } from "@/schemas/auth-schema";
import { RequestWithUserId } from "@/types";
import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma";
import { ZodError } from "zod";
import { Resend } from "resend";
import handlebars from "handlebars";
import path from "path";
import fs from "fs/promises";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email confirmation for registration
export async function emailVerification(req: Request, res: Response, next: NextFunction) {
   try {
      const locale = req.cookies.NEXT_LOCALE;
      const parsedData = emailVerificationSchema.parse(req.body);
      const { email } = parsedData;

      const existingUser = await prisma.user.findUnique({
         where: { email },
      });

      if (existingUser)
         return res
            .status(409)
            .json({ message: locale == "id" ? "Email sudah terpakai" : "Email has already been used", ok: false });

      const existingValidToken = await prisma.verificationToken.findFirst({
         where: {
            email,
            expires: { gt: new Date(Date.now()) },
         },
      });

      if (existingValidToken)
         return res
            .status(200)
            .json({ message: locale == "id" ? "Silahkan cek email anda" : "Please check your email", ok: true });

      // Generate confirmation token
      const token = await generateVerificationToken(email);
      const confirmationLink = `${process.env.CLIENT_PORT}/register/select-role?token=${token.token}&email=${email}`;

      const templatePath = path.join(__dirname, "../../templates", "auth-email-templates.hbs");
      const templateSource = await fs.readFile(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({
         confirmationLink,
      });

      const { error } = await resend.emails.send({
         from: "Oasis <registration@oasis-resort.xyz>",
         to: [email],
         subject: "Email Confirmation (OASIS)",
         html: html,
      });

      if (error) {
         return res
            .status(400)
            .json({ message: locale == "id" ? "Terjadi kesalahan" : "Something went wrong", ok: false });
      }

      return res.status(200).json({
         message: locale == "id" ? "Email terkirim. Cek email anda" : "Email sent. Please check your email",
         ok: true,
      });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}

// Email confirmation for updating email
export async function emailUpdateVerification(req: Request, res: Response, next: NextFunction) {
   try {
      const locale = req.cookies.NEXT_LOCALE;
      const parsedData = emailVerificationSchema.parse(req.body);
      const { email } = parsedData;

      const id = (req as RequestWithUserId).user?.id;

      const user = await prisma.user.findUnique({
         where: {
            id,
         },
      });

      if (!user)
         return res.status(404).json({
            message: "User not found",
            ok: false,
         });

      const existingEmail = await prisma.user.findUnique({
         where: { email },
      });

      if (existingEmail)
         return res
            .status(409)
            .json({ message: locale == "id" ? "Email sudah terpakai" : "Email has already been used", ok: false });

      const existingValidToken = await prisma.verificationToken.findFirst({
         where: {
            email,
            expires: { gt: new Date(Date.now()) },
         },
      });

      if (existingValidToken)
         return res
            .status(200)
            .json({ message: locale == "id" ? "Silahkan cek email anda" : "Please check your email", ok: true });

      // Generate confirmation token
      const token = await generateVerificationToken(email);
      const confirmationLink = `${process.env.CLIENT_PORT}/new-verification?token=${token.token}`;

      const templatePath = path.join(__dirname, "../../templates", "update-email-templates.hbs");
      const templateSource = await fs.readFile(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({
         confirmationLink,
         name: user.name,
      });

      const { error } = await resend.emails.send({
         from: "Oasis <email-update@oasis-resort.xyz>",
         to: [email],
         subject: "Email Confirmation (OASIS)",
         html: html,
      });

      if (error) {
         return res
            .status(400)
            .json({ message: locale == "id" ? "Terjadi kesalahan" : "Something went wrong", ok: false });
      }

      return res.status(200).json({
         message: locale == "id" ? "Email terkirim. Cek email anda" : "Email sent. Please check your email",
         ok: true,
      });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}

// Email for resetting password
export async function passwordResetEmail(req: Request, res: Response, next: NextFunction) {
   try {
      const locale = req.cookies.NEXT_LOCALE;
      const parsedData = emailVerificationSchema.parse(req.body);
      const { email } = parsedData;

      const existingValidToken = await prisma.passwordResetToken.findFirst({
         where: {
            email,
            expires: { gt: new Date(Date.now()) },
         },
      });

      if (existingValidToken)
         return res
            .status(200)
            .json({ message: locale == "id" ? "Silahkan cek email anda" : "Please check your email", ok: true });

      // Generate confirmation token
      const token = await generatePasswordResetToken(email);
      const resetLink = `${process.env.CLIENT_PORT}/new-password?token=${token.token}`;

      const templatePath = path.join(__dirname, "../../templates", "reset-password-templates.hbs");
      const templateSource = await fs.readFile(templatePath, "utf-8");
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({
         resetLink,
      });

      const { error } = await resend.emails.send({
         from: "Oasis <password-reset@oasis-resort.xyz>",
         to: [email],
         subject: "Reset Password (OASIS)",
         html: html,
      });

      if (error) {
         return res
            .status(400)
            .json({ message: locale == "id" ? "Terjadi kesalahan" : "Something went wrong", ok: false });
      }

      return res.status(200).json({
         message:
            locale == "id"
               ? "Tautan reset telah dikirim. Silakan periksa email Anda"
               : "Reset link sent. Please check your email",
         ok: true,
      });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}
