import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";

//get all Pagination
export async function Pagination(req: Request, res: Response, next: NextFunction) {
   try {
      const { page = 1, limit = 3 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      const events = await prisma.property.findMany({
         skip: offset,
         take: Number(limit),
      });

      const totalEvents = await prisma.property.count();

      return res.status(200).json({
         data: events,
         meta: {
            totalEvents,
            currentPage: Number(page),
            totalPages: Math.ceil(totalEvents / Number(limit)),
         },
      });
   } catch (error) {
      next(error);
   }
}

//get all property

export async function createProperty(req: Request, res: Response, next: NextFunction) {
   try {
      const { propertyName, propertyAddress, propertyDescription, propertyImage, room, tenantId } = req.body;

      await prisma.property.create({
         data: {
            name: propertyName,
            address: propertyAddress,
            description: propertyDescription,
            pictureUrl: propertyImage,
            room: {
               create: room,
            },
            tenantId,
         },
      });
   } catch (error) {
      next(Error);
   }
}
