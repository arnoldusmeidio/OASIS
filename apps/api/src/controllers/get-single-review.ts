import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";

export async function getSingleReview(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;

      const user = await prisma.user.findUnique({
         where: { id },
         include: { customer: true },
      });

      const { bookingNumber } = req.params;

      const customerId = user?.customer?.id;

      if (!customerId) {
         return res.status(400).json({
            message: "customer Id not found",
            ok: false,
         });
      }

      const getBooking = await prisma.booking.findUnique({
         where: {
            bookingNumber,
         },
      });

      if (!getBooking) {
         return res.status(404).json({ message: "No bookings found", ok: false });
      }

      const getReview = await prisma.review.findFirst({
         where: {
            bookingId: getBooking.id,
         },
      });

      return res.status(200).json({ data: getReview, ok: true });
   } catch (error) {
      next(error);
   }
}
