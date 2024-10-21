import { Request, Response, NextFunction } from "express";
import { RequestWithUserId } from "../types";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";

import prisma from "@/prisma";
import { selectUserRoleSchema, updateEmailUserSchema } from "@/schemas/user-schema";
import { getVerificationTokenByToken } from "@/lib/verification-token";

// GET METHOD
// Search User by ID
export async function getSingleUser(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;

      const user = await prisma.user.findUnique({
         where: {
            id: id,
         },
         include: {
            customer: true,
            tenant: true,
         },
      });

      if (!user)
         return res.status(404).json({
            message: "User not found",
            ok: false,
         });

      return res.status(200).json({ data: user, ok: true });
   } catch (error) {
      next(error);
   }
}

// UPDATE METHOD
// Select User Role
export async function selectUserRole(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const parsedData = selectUserRoleSchema.parse(req.body);
      const { role } = parsedData;
      const selectRole = {
         ...(role == "customer" ? { customer: { create: {} } } : role == "tenant" ? { tenant: { create: {} } } : {}),
      };

      const user = await prisma.user.findUnique({
         where: {
            id: id,
         },
         include: {
            tenant: true,
            customer: true,
         },
      });

      if (!user)
         return res.status(404).json({
            message: "User not found",
         });

      if (user.tenant || user.customer) {
         return res.status(409).json({ message: "This user already has a role", ok: false });
      }

      await prisma.user.update({
         where: {
            id: id,
         },
         data: {
            ...selectRole,
         },
      });

      const jwtPayload = { name: user.name, email: user.email, id: user.id, role };
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string, {
         expiresIn: "30d",
      });

      res.cookie("token", token, {
         httpOnly: true,
         expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
         sameSite: "none", // need to change on production to be true
         secure: true, // turn off while check on thunderclient
      })
         .status(200)
         .json({ message: "Role updated successfully", ok: true, role });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}

// Update user email
export async function updateUserEmail(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const parsedData = updateEmailUserSchema.parse(req.body);
      const { token } = parsedData;

      const existingToken = await getVerificationTokenByToken(token);
      if (!existingToken) return res.status(404).json({ message: "Invalid Token", ok: false });

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) return res.status(400).json({ message: "Token has expired", ok: false });

      const user = await prisma.user.findUnique({
         where: {
            id: id,
         },
      });

      if (!user)
         return res.status(404).json({
            message: "User not found",
            ok: false,
         });

      const existingEmail = await prisma.user.findUnique({
         where: { email: existingToken.email },
      });

      if (existingEmail) return res.status(409).json({ message: "Email has already been used", ok: false });

      await prisma.user.update({
         where: {
            id: id,
         },
         data: {
            email: existingToken.email,
         },
      });

      await prisma.verificationToken.delete({
         where: { id: existingToken.id },
      });

      res.status(200).json({ message: "Email updated successfully", ok: true });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}
