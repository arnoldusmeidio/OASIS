import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import crypto from "crypto";
import { RequestWithUserId } from "@/types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getBookings(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

      const bookings = await prisma.booking.findMany({
         where: { customerId: user.id },
         include: { room: true },
      });

      if (!bookings) {
         return res.send(200).json({ data: bookings, message: "No bookings found", ok: true });
      }

      return res.status(200).json({ data: bookings, ok: true });
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
         return res.send(404).json({ message: "No bookings found", ok: false });
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
         return res.send(404).json({ message: "No bookings found", ok: false });
      }

      await prisma.booking.delete({
         where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
      });

      return res.status(200).json({ message: "Booking cancelled", ok: true });
   } catch (error) {
      next(error);
   }
}
