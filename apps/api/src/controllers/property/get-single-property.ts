import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";

export const getSingleProperty = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { propertyId } = req.params;

      const getProperty = await prisma.property.findUnique({
         where: {
            id: propertyId,
         },
         include: {
            propertyPictures: true,
         },
      });

      if (!getProperty) res.status(404).json({ message: "Property not found" });

      return res.status(200).json({ data: getProperty, ok: true });
   } catch (error) {
      next(error);
      console.error(error);
   }
};
