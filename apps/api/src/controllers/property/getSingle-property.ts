import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";

export const getSingleProperty = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;

      const getProperty = await prisma.property.findUnique({
         where: {
            id: id,
         },
      });

      if (!getProperty) res.status(404).json({ message: "Property not found" });

      return res.status(200).json({ message: "property edited" });
   } catch (error) {
      next(error);
      console.error(error);
   }
};
