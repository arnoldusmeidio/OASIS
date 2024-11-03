import { z } from "zod";

export const ReviewSchema = z.object({
   feedback: z
      .string()
      .min(10, { message: "Feedback should be at least 10 characters long" })
      .max(500, { message: "Feedback should be less than 500 characters" })
      .nonempty({ message: "Feedback is required" }),
});
