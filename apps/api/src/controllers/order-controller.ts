import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";

export async function getBookingsTenant(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      let locale = req.cookies.NEXT_LOCALE;
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, tenant: { id } },
      });

      if (!user)
         return res
            .status(400)
            .json({ message: locale == "id" ? "User tidak ditemukan" : "User not found", ok: false });

      const property = await prisma.property.findMany({
         where: { tenantId: user.id },
         include: { room: { include: { bookings: true } } },
      });

      if (!property) {
         return res.status(200).json({
            data: property,
            message: locale == "id" ? "Booking tidak ditemukan" : "Booking not found",
            ok: true,
         });
      }

      return res.status(200).json({ data: property, ok: true });
   } catch (error) {
      next(error);
   }
}
