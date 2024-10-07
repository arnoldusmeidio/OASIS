import * as z from "zod";

export const LoginSchema = z.object({
   email: z.string().min(1, { message: "Email is required" }).email(),
   password: z.string().min(1, { message: "Password is required" }),
   rememberMe: z.boolean(),
});

export const emailVerificationSchema = z.object({
   email: z.string().min(1, { message: "Email is required" }).email(),
});

export const RegisterSchema = z
   .object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().min(1, { message: "Email is required" }).email(),
      password: z.string().min(1, { message: "Password must be at least 8 characters long" }),
      confirmPassword: z.string().min(1, { message: "Confirmation password is required" }),
   })
   .refine(
      (values) => {
         return values.password === values.confirmPassword;
      },
      {
         message: "Password do not match",
         path: ["confirmPassword"],
      },
   );

export const UpdateRoleSchema = z.object({
   role: z.string({ message: "Please select a role" }),
});
