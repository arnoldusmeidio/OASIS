import { NextFunction, Request, Response } from "express";
import cloudinary from "@/config/cloudinary";
import prisma from "@/prisma";
import fs from "fs/promises";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const propertyId = req.params.propertyId;
      const { roomName, roomDescription, roomCapacity, roomPrice } = req.body;

      // Validate input
      if (!roomName || !roomDescription || !roomCapacity || !roomPrice) {
         return res.status(400).json({ message: "All fields are required" });
      }

      if (!req.file) {
         return res.status(400).json({ message: "No file uploaded" });
      }

      // Upload image to Cloudinary
      const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
         folder: "images",
      });

      // Create room in database
      await prisma.room.create({
         data: {
            propertyId,
            type: roomName,
            description: roomDescription,
            price: Number(roomPrice),
            roomCapacity: Number(roomCapacity),
            pictureUrl: cloudinaryData.secure_url,
         },
      });

      // // Delete the file from local storage
      // try {
      //    await fs.unlink(req.file.path);
      // } catch (unlinkError) {
      //    console.error("Error deleting file:", unlinkError);
      //    // You might want to handle this error differently
      // }

      res.status(201).json({ message: "Room Created", ok: true });
   } catch (error) {
      next(error);
   }
};
