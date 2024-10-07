import { z } from "zod";

export const emailVerificationSchema = z.object({
   email: z.string().min(1, { message: "Email is required" }).email(),
});

export const registerSchema = z.object({
   name: z.string().min(1, { message: "Name is required" }),
   email: z.string().min(1, { message: "Email is required" }).email(),
   password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
   role: z.string(),
});

export const loginSchema = z.object({
   email: z.string().min(1, { message: "Email is required" }).email(),
   password: z.string().min(1, { message: "Password is required" }),
   rememberMe: z.boolean(),
});
