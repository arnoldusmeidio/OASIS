import { z } from "zod";

export const selectUserRoleSchema = z.object({
   role: z.string(),
});
