import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const searchSchema = z.object({
   location: z.string().min(1, { message: "Enter a destination to start searching" }).max(50),
   dates: z
      .object(
         {
            from: z.date(),
            to: z.date(),
         },
         {
            required_error: "Please select a date range",
         },
      )
      .refine((data) => data.from < data.to, {
         path: ["dates"],
         message: "From date must be before to date",
      }),

   adults: z
      .string()
      .min(1, { message: "Please select at least 1 adult" })
      .max(12, { message: "Max 12 adults occupancy" }),
   children: z.string().min(0).max(12, { message: "Max 12 children occupancy" }),
   rooms: z.string().min(1, { message: "Please select at least 1 room" }),
});

export type FormTypeSearch = z.infer<typeof searchSchema>;

export const useFormSearch = () =>
   useForm<FormTypeSearch>({
      resolver: zodResolver(searchSchema),
      defaultValues: {
         location: "",
         dates: {
            from: undefined,
            to: undefined,
         },
         adults: "1",
         children: "0",
         rooms: "1",
      },
      mode: "onSubmit",
   });
