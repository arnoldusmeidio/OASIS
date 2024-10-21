import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import cloudinary from "@/config/cloudinary";
import { RequestWithUserId } from "@/types";
import fs from "fs/promises";

//Create property
export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
   try {
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

      const { propertyName, propertyAddress, propertyDescription } = req.body;

      if (!req.file) {
         return res.status(400).json({ message: "No file uploaded" });
      }

      const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
         folder: "images",
      });

      await prisma.property.create({
         data: {
            tenantId,
            name: propertyName,
            address: propertyAddress,
            description: propertyDescription,
            pictureUrl: cloudinaryData.secure_url,
         },
      });

      fs.unlink(req.file.path);

      return res.status(201).json({ message: "property Created" });
   } catch (error) {
      console.error("Error creating property:", error);
      next(Error);
   }
};
