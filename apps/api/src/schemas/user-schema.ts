import { Currency, Language } from "@prisma/client";
import { z } from "zod";

export const selectUserRoleSchema = z.object({
   role: z.string({ message: "Role is required" }),
});

export const updateEmailUserSchema = z.object({
   token: z.string({ message: "Invalid Token" }),
});

export const profileSchema = z
   .object({
      name: z.optional(z.string()),
      password: z.optional(z.string()),
      newPassword: z.optional(z.string().min(8, { message: "Password must be at least 8 characters long" })),
      language: z.optional(z.nativeEnum(Language)),
      currency: z.optional(z.nativeEnum(Currency)),
   })
   .refine(
      (values) => {
         if (values.password && !values.newPassword) {
            return false;
         }

         return true;
      },
      {
         message: "New password is required",
         path: ["newPassword"],
      },
   )
   .refine(
      (values) => {
         if (!values.password && values.newPassword) {
            return false;
         }

         return true;
      },
      {
         message: "Password is required",
         path: ["password"],
      },
   );
