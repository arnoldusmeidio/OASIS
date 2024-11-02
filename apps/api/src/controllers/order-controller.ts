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

export async function getBookingsByBookingNumber(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

      const { bookingNumber } = req.params;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, customerId: user.id },
         include: { room: true },
      });

      if (!booking) {
         return res.status(404).json({ message: "No bookings found", ok: false });
      }

      return res.status(200).json({ data: booking, ok: true });
   } catch (error) {
      next(error);
   }
}

export async function deleteBookingByBookingNumber(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

      const { bookingNumber } = req.params;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
      });

      if (!booking) {
         return res.status(404).json({ message: "No bookings found", ok: false });
      }

      await prisma.booking.delete({
         where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
      });

      return res.status(200).json({ message: "Booking cancelled", ok: true });
   } catch (error) {
      next(error);
   }
}
