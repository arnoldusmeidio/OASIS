import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = (req as RequestWithUserId).user?.id;
      const { review, star, bookingId, propertyId } = req.body;

      if (!userId || !review || !star || !bookingId || !propertyId) {
         return res.status(400).json({ message: "Missing required fields", ok: false });
      }

      // Verify user exists and is a customer
      const user = await prisma.customer.findUnique({
         where: { id: userId },
      });

      if (!user) {
         return res.status(404).json({ message: "User not found", ok: false });
      }

      // Create review
      const newReview = await prisma.review.create({
         data: {
            review,
            star,
            bookingId,
            propertyId,
            customerId: userId,
         },
      });

      return res.status(201).json({ message: "Review created successfully", data: newReview, ok: true });
   } catch (error) {
      next(error);
   }
};
