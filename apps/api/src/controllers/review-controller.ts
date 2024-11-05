import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const id = (req as RequestWithUserId).user?.id;

      const { bookingNumber } = req.params;
      const { review, star } = req.body;

      if (!review || star === undefined || !bookingNumber) {
         return res.status(400).json({ message: "Missing required fields", ok: false });
      }

      // Verify user exists
      const user = await prisma.user.findUnique({
         where: { id },
         include: { customer: true },
      });

      const bookingId = await prisma.booking.findUnique({
         where: { bookingNumber, customerId: user?.id, paymentStatus: "COMPLETED" },
         include: { room: { include: { property: true } }, customer: { include: { user: true } } },
      });

      const customerId = user?.customer?.id;

      if (!customerId) {
         return res.status(400).json({ message: "Customer Id not found" });
      }

      if (!bookingId) {
         return res.status(400).json({ message: "booking Id not found" });
      }

      const newReview = await prisma.review.create({
         data: {
            review,
            star: +star,
            bookingId: bookingId.id,
            propertyId: bookingId.room.property.id,
            customerId: user.id,
         },
      });

      return res.status(201).json({ message: "Review created successfully", data: newReview, ok: true });
   } catch (error) {
      next(error);
   }
};
