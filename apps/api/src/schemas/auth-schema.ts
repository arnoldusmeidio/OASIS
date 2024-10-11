import { z } from "zod";

export const emailVerificationSchema = z.object({
   email: z.string().min(1, { message: "Email is required" }).email(),
});

export const registerSchema = z.object({
   name: z.string().min(1, { message: "Name is required" }),
   password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
   role: z.string({ message: "role is required" }),
   token: z.string({ message: "Invalid Token" }),
});

export const loginSchema = z.object({
   email: z.string().min(1, { message: "Email is required" }).email(),
   password: z.string().min(1, { message: "Password is required" }),
   rememberMe: z.boolean({ message: "Remember me is required" }),
});

export const resetSchema = z.object({
   email: z.string().min(1, { message: "Email is required" }).email(),
});

export const newPasswordSchema = z.object({
   password: z.string().min(1, { message: "Password must be at least 8 characters long" }),
   token: z.string({ message: "Invalid Token" }),
});
