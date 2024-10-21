import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import cloudinary from "@/config/cloudinary";
import { RequestWithUserId } from "@/types"; // Assuming you have a user type in your request

// Edit Property

export async function editProperty(req: Request, res: Response, next: NextFunction) {
   try {
      const { propertyName, propertyAddress, propertyDescription } = req.body;
      const propertyId = req.params.propertyId; // Get propertyId from URL parameters

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

      if (!req.file) {
         return res.status(400).json({ message: "No file uploaded" });
      }

      const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
         folder: "images",
      });

      const property = await prisma.property.findUnique({
         where: {
            id: propertyId,
         },
      });

      if (!property) {
         return res.status(404).json({ message: "Property not found" });
      }

      const keluar = await prisma.property.update({
         where: {
            id: propertyId,
         },
         data: {
            tenantId,
            name: propertyName,
            address: propertyAddress,
            description: propertyDescription,
            pictureUrl: cloudinaryData.secure_url,
         },
      });

      res.status(201).json({ message: "Property edited", data: keluar, ok: true });
   } catch (error) {
      console.error(error);
      next(error);
   }
}
