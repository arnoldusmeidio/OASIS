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
            room: {
               orderBy: {
                  defaultPrice: "asc",
               },
               include: {
                  roomPictures: true,
               },
            },
            reviews: {
               orderBy: {
                  createdAt: "desc",
               },
               include: {
                  customer: {
                     select: {
                        user: {
                           select: { name: true },
                        },
                     },
                  },
               },
            },
         },
      });

      if (!getProperty) res.status(404).json({ message: "Property not found" });

      const averageRating = getProperty?.reviews.length
         ? getProperty.reviews.reduce((acc, review) => acc + review.star, 0) / getProperty.reviews.length
         : 0;

      return res.status(200).json({
         data: {
            ...getProperty,
            averageRating: {
               star: averageRating,
            },
         },
         ok: true,
      });
   } catch (error) {
      next(error);
      console.error(error);
   }
};
