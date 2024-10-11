import { z } from "zod";

export const selectUserRoleSchema = z.object({
   role: z.string({ message: "Role is required" }),
});

export const updateEmailUserSchema = z.object({
   token: z.string({ message: "Invalid Token" }),
});
