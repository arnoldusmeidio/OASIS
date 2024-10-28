import { z } from "zod";

export const bookingSchema = z.object({
   startDate: z.date(),
   endDate: z.date(),
});
