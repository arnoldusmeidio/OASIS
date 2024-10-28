import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";

//get all Pagination
export async function getAllPropertiesPagination(req: Request, res: Response, next: NextFunction) {
   try {
      const { page = 1, limit = 10 } = req.query;
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
