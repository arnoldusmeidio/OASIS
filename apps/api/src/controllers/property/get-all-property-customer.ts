import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";

export async function getAllPropertiesCustomer(req: Request, res: Response, next: NextFunction) {
   try {
      const properties = await prisma.property.findMany({
         include: {
            propertyPictures: true,
         },
      });

      return res.status(200).json({
         ok: true,
         data: properties,
      });
   } catch (error) {
      next(error);
   }
}
