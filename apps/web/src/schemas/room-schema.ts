import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createRoomSchema = z.object({
   roomName: z.string().min(1, { message: "Room Name is required" }),
   roomDescription: z.string().min(1, { message: "Room Description is required" }),
   roomPictureUrl: z
      .instanceof(File)
      .refine(
         (files) => ACCEPTED_IMAGE_TYPES.includes(files.type),
         "Only .jpg, .jpeg, .png, and .webp formats are supported",
      ),

   roomPrice: z
      .string()
      .min(1, { message: "Price is required" })
      .transform((val) => Number(val)), // Transform string to number for validation
   roomCapacity: z
      .string()
      .min(1, { message: "Room Capacity is required" })
      .transform((val) => Number(val)), // Transform string to number for validation
});
