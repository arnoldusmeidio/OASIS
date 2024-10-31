import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import cloudinary from "@/config/cloudinary";
import { RequestWithUserId } from "@/types"; // Assuming user type in your request

// Delete Property
export const deleteProperty = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
   try {
      const id = req.user?.id;
      const propertyId = req.params.propertyId;

      const property = await prisma.property.findUnique({
         where: { id: propertyId },
         include: { tenant: true, propertyPictures: true },
      });

      if (!property || !property.tenant) {
         return res.status(404).json({ message: "Property or Tenant not found" });
      }

      const tenantId = property.tenant.id;

      if (id !== tenantId) {
         return res.status(403).json({ message: "Unauthorized to delete this property" });
      }

      for (const pic of property.propertyPictures) {
         const publicId = pic.url.split("/").pop()?.split(".")[0];
         if (publicId) {
            await cloudinary.uploader.destroy(`images/${publicId}`);
         }
      }

      await prisma.property.delete({
         where: { id: propertyId },
      });

      return res.status(200).json({ message: "Property successfully deleted", ok: true });
   } catch (error) {
      console.error(error);
      next(error);
   }
};
