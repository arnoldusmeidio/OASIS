import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import cloudinary from "@/config/cloudinary";

export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const roomId = req.params.roomId;

      // Find the room by ID, including the roomPictures relation
      const room = await prisma.room.findUnique({
         where: {
            id: roomId,
         },
         include: {
            roomPictures: true, // Include the roomPictures relation
         },
      });

      if (!room) {
         return res.status(404).json({ message: "Room not found" });
      }

      const publicId = room.roomPictures[0]?.url?.split("/").pop()?.split(".")[0];

      if (publicId) {
         await cloudinary.uploader.destroy(`images/${publicId}`);
      }

      // Delete the room from the database
      await prisma.room.delete({
         where: {
            id: roomId,
         },
      });

      // Send a success response
      return res.status(200).json({
         message: "Room successfully deleted",
         ok: true,
      });
   } catch (error) {
      next(error); // Pass error to the next middleware
      console.error(error);
   }
};
