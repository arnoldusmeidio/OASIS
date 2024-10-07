import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { AuthenticatedUser, RequestWithUserId } from "../types";

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
