import { NextFunction, Request, Response } from "express";
import cloudinary from "@/config/cloudinary";
import prisma from "@/prisma";
import fs from "fs/promises";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const propertyId = req.params.propertyId;
      const { roomName, roomDescription, roomCapacity, defaultPrice } = req.body;

      console.log(req.body);
      // Validate input
      if (!roomName || !roomDescription || !roomCapacity) {
         return res.status(400).json({ message: "All fields are required" });
      }

      const existingProperty = await prisma.property.findUnique({
         where: { id: propertyId },
      });

      if (!existingProperty) {
         return res.status(404).json({ message: `Property with ID ${propertyId} does not exist.` });
      }

      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
         return res.status(400).json({ message: "No files uploaded" });
      }

      const pictureUrls = await Promise.all(
         (req.files as Express.Multer.File[]).map(async (file) => {
            try {
               const cloudinaryData = await cloudinary.uploader.upload(file.path, {
                  folder: "images",
               });
               // Remove file after upload
               await fs.unlink(file.path);

               return { url: cloudinaryData.secure_url }; // Return the URL
            } catch (uploadError) {
               console.error("Error uploading file:", uploadError);
               throw new Error("Error uploading one or more files");
            }
         }),
      );

      // Create room in database
      const kamar = await prisma.room.create({
         data: {
            propertyId,
            type: roomName,
            description: roomDescription,
            defaultPrice: parseFloat(defaultPrice),
            // roomPrice: {
            //    create: [
            //       {
            //          price: 1000.0,
            //          startDate: "",
            //          endDate: "",
            //       },
            //    ],
            // },
            roomCapacity: Number(roomCapacity),
            roomPictures: {
               create: pictureUrls,
            },
         },
      });

      console.log(pictureUrls);
      res.status(201).json({ message: "Room Created", ok: true, data: kamar });
   } catch (error) {
      next(error);
   }
};
