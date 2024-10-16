import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import cloudinary from "@/config/cloudinary";
import { RequestWithUserId } from "@/types";
import { idText } from "typescript";

//get all Pagination
export async function Pagination(req: Request, res: Response, next: NextFunction) {
   try {
      const { page = 1, limit = 3 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      const properties = await prisma.property.findMany({
         skip: offset,
         take: Number(limit),
      });

      const totalProperties = await prisma.property.count();

      return res.status(200).json({
         data: properties,
         meta: {
            totalProperties,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProperties / Number(limit)),
         },
      });
   } catch (error) {
      next(error);
   }
}

//Create property
// Property creation handler
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
      return res.status(201).json({ message: "property Created" });
   } catch (error) {
      console.error("Error creating property:", error);
      next(Error);
   }
};

export const getSingleProperty = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const getProperty = await prisma.property.findUnique({
         where: {
            id: id,
         },
      });

      if (!getProperty) res.status(404).json({ message: "Property not found" });

      return res.status(200).json({ message: "sucsessfully error" });
   } catch (error) {
      next(error);
      console.error(error);
   }
};
