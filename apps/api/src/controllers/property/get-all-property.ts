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
      const locale = req.cookies.NEXT_LOCALE;
      const { page = 1, limit = 10, location, totalperson } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      if (!location)
         return res
            .status(404)
            .json({ message: locale == "id" ? "Masukan lokasi" : "Please input the location", ok: false });

      const properties = await prisma.property.findMany({
         where: {
            OR: [
               {
                  name: {
                     contains: location as string,
                  },
               },
               {
                  address: {
                     contains: location as string,
                  },
               },
            ],
            room: {
               some: {
                  roomCapacity: { gte: Number(totalperson) },
               },
            },
         },
         include: {
            reviews: true,
            propertyPictures: true,
            room: {
               where: {
                  roomCapacity: { gte: Number(totalperson) },
               },
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
            OR: [
               {
                  name: {
                     contains: location as string,
                  },
               },
               {
                  address: {
                     contains: location as string,
                  },
               },
            ],
            room: {
               some: {
                  roomCapacity: { gte: Number(totalperson) },
               },
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

//get Search Pagination
export async function getPopularProperties(req: Request, res: Response, next: NextFunction) {
   try {
      const rating = await prisma.review.groupBy({
         by: ["propertyId"],
         _avg: { star: true },
         orderBy: {
            _avg: {
               star: "desc",
            },
         },
         take: 6,
      });

      const propertiesId = rating.map((property) => property.propertyId);

      const topProperties = await prisma.property.findMany({
         where: {
            id: { in: propertiesId },
         },
         include: {
            propertyPictures: true,
         },
      });

      const topPropertiesWithRatings = topProperties.map((property) => ({
         ...property,
         averageRating: rating.find((rating) => rating.propertyId === property.id)?._avg,
      }));

      const sortedTopProperties = topPropertiesWithRatings.sort((a, b) => {
         return (b.averageRating?.star || 0) - (a.averageRating?.star || 0);
      });

      return res.status(200).json({ data: sortedTopProperties, ok: true });
   } catch (error) {
      next(error);
   }
}
