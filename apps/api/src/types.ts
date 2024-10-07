import { Request } from "express";

// This file contains type for req.user

export interface AuthenticatedUser {
   email?: string;
   id?: string;
   role?: string;
}

export interface RequestWithUserId extends Request {
   user?: AuthenticatedUser;
}
