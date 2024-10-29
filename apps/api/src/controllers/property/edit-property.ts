import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import cloudinary from "@/config/cloudinary";
import { RequestWithUserId } from "@/types";
import fs from "fs/promises";

export async function editProperty(req: Request, res: Response, next: NextFunction) {
   try {
      const { propertyName, propertyAddress, propertyDescription, category, lat, lng } = req.body;

      const propertyId = req.params.propertyId; // Get propertyId from URL parameters

      console.log(req.params.propertyid);

      const id = (req as RequestWithUserId).user?.id;

      const user = await prisma.user.findUnique({
         where: {
            id: id,
         },
         include: { tenant: true },
      });

      const tenantId = user?.tenant?.id;

      if (!tenantId) {
         return res.status(400).json({ message: "Tenant ID not found" });
      }

      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
         return res.status(400).json({ message: "No files uploaded" });
      }

      // Upload each file to Cloudinary and collect URLs
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

      const property = await prisma.property.findUnique({
         where: {
            id: propertyId,
         },
      });

      if (!property) {
         return res.status(404).json({ message: "Property not found" });
      }

      const geo = await fetch(
         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(propertyAddress)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      );

      const data = await geo.json();
      const { lat, lng } = data?.results?.[0]?.geometry.location;

      const keluar = await prisma.property.update({
         where: {
            id: propertyId,
         },
         data: {
            tenantId,
            name: propertyName,
            address: propertyAddress,
            description: propertyDescription,
            category,
            lng,
            lat,
            propertyPictures: {
               create: pictureUrls,
            },
         },
      });

      res.status(201).json({ message: "Property edited", data: keluar, ok: true });
   } catch (error) {
      console.error(error);
      next(error);
   }
}
