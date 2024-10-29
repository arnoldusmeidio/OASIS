import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";

//get all Pagination
export async function getAllPropertiesPagination(req: Request, res: Response, next: NextFunction) {
   try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      const properties = await prisma.property.findMany({
         include: {
            propertyPictures: true,
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
      });
   } catch (error) {
      next(error);
   }
}

//get Search Pagination
export async function getSearchedPropertiesPagination(req: Request, res: Response, next: NextFunction) {
   try {
      const locale = req.cookies.NEXT_LOCALE;
      const { page = 1, limit = 10, location } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      if (!location)
         return res
            .status(404)
            .json({ message: locale == "id" ? "Masukan lokasi" : "Please input the location", ok: false });

      const properties = await prisma.property.findMany({
         where: {
            address: {
               contains: location as string,
            },
         },
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

      const totalProperties = await prisma.property.count({
         where: {
            address: {
               contains: location as string,
            },
         },
      });

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
