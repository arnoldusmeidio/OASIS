import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createRoomSchema = z.object({
   roomName: z.string().min(1, { message: "Room Name is required" }),
   roomDescription: z.string().min(1, { message: "Room Description is required" }),
   roomPictureUrl: z
      .any()
      .refine((files) => files && files.length > 0, "Room picture is required")
      .refine(
         (files) => files && ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
         "Only .jpg, .jpeg, .png, and .webp formats are supported",
      ),

   roomPrice: z.number().min(1, { message: "Price is required" }),
   roomCapacity: z.number().min(1, { message: "Room Capacity is required" }),
});

export const propertySchema = z.object({
   propertyName: z.string().min(1, { message: "Property Name is required" }),
   propertyAddress: z.string().min(1, { message: "Property address is required" }),
   propertyDescription: z.string().min(1, { message: "Property Description is required" }),
   propertyImage: z
      .any()
      .refine((files) => files && files.length > 0, "Room picture is required") // Ensure files is defined
      .refine(
         (files) => files && ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), // Ensure files exists before checking types
         "Only .jpg, .jpeg, .png, and .webp formats are supported",
      ),

   room: z.array(createRoomSchema).min(1, { message: "There should be at least 1 room" }),
});
