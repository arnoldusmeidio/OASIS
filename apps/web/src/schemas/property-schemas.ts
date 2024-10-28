import * as z from "zod";
import { Category } from "@/types/property-types";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const propertySchema = z.object({
   propertyName: z.string().min(1, { message: "Property Name is required" }),
   propertyAddress: z.string().min(1, { message: "Property Address is required" }),
   propertyDescription: z.string().min(1, { message: "Property Description is required" }),
   category: z.nativeEnum(Category),
   pictureUrl: z
      .instanceof(File)
      .refine(
         (files) => ACCEPTED_IMAGE_TYPES.includes(files.type),
         "Only .jpg, .jpeg, .png, and .webp formats are supported",
      ),
});
