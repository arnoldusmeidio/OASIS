import { NextFunction, Request, Response } from "express";
import cloudinary from "@/config/cloudinary";
import prisma from "@/prisma";
import fs from "fs/promises";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const propertyId = req.params.id;

      const { roomName, roomDescription, roomCapacity, roomPrice } = req.body;

      if (!req.file) {
         return res.status(400).json({ message: "No file uploaded" });
      }

      const cloudinaryData = await cloudinary.uploader.upload(req.file?.path, {
         folder: "images",
      });

      await prisma.room.create({
         data: {
            propertyId,
            type: roomName,
            description: roomDescription,
            price: roomPrice,
            roomCapacity: Number(roomCapacity),
            pictureUrl: cloudinaryData.secure_url,
         },
      });
      console.log(propertyId);

      fs.unlink(req.file.path);

      res.status(201).json({ message: "Room Created", ok: true });
   } catch (error) {
      next(error);
   }
};
