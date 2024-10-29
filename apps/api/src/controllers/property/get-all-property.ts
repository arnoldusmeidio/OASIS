import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";

//get all Pagination
export async function getAllPropertiesPagination(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;

      const user = await prisma.user.findUnique({
         where: { id },
         include: { tenant: true },
      });

      const tenantId = user?.tenant?.id;

      if (!tenantId) {
         return res.status(400).json({ message: "Tenant ID not found" });
      }

      const { page = 1, limit = 3 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      const properties = await prisma.property.findMany({
         where: {
            tenantId: id,
         },
         include: {
            propertyPictures: true,
         },
         skip: offset,
         take: Number(limit),
      });

      const totalProperties = await prisma.property.count({
         where: {
            tenantId: id,
         },
      });

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

//get Search Pagination
export async function getSearchedPropertiesPagination(req: Request, res: Response, next: NextFunction) {
   try {
      const test = req.body;
      const { page = 1, limit = 10 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      const properties = await prisma.property.findMany({
         include: {
            reviews: true,
            propertyPictures: true,
            room: {
               include: {
                  roomPrice: {
                     orderBy: { price: "asc" },
                  },
               },
            },
         },
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
         ok: true,
      });
   } catch (error) {
      next(error);
   }
}
