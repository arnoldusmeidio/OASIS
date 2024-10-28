import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma";
import jwt, { Secret } from "jsonwebtoken";
import { AuthenticatedUser, RequestWithUserId } from "../types";

// Authentication
export function verifyToken(req: Request, res: Response, next: NextFunction) {
   try {
      const token = req.cookies.token;

      if (!token) {
         return res.status(401).json({
            message: "No token present",
         });
      }

      const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);

      if (!verifiedUser) return res.status(403).json({ message: "Invalid Token" });

      if (typeof verifiedUser !== "string") {
         (req as RequestWithUserId).user = verifiedUser as AuthenticatedUser;
      }

      next();
   } catch (error) {
      next(error);
   }
}

// Tenant authorization

interface RequestWithTenantId extends Request {
   tenantId?: string;
}

export async function tenantGuard(req: Request, res: Response, next: NextFunction) {
   try {
      const tenant = await prisma.tenant.findUnique({
         where: { id: (req as RequestWithUserId).user?.id },
      });

      if (!tenant) return res.status(401).json({ message: "You are not an tenant" });

      // (req as RequestWithTenantId).tenantId = tenant.id;

      next();
   } catch (error) {
      next(error);
   }
}

// Customer authorization
export async function customerGuard(req: Request, res: Response, next: NextFunction) {
   try {
      const isTenant = await prisma.tenant.findUnique({
         where: { id: (req as RequestWithUserId).user?.id },
      });

      if (isTenant) return res.status(401).json({ message: "You are not authorized" });

      next();
   } catch (error) {
      next(error);
   }
}
