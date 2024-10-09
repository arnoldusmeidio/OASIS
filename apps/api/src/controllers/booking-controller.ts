import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import crypto from "crypto";
import { RequestWithUserId } from "@/types";
import { Resend } from "resend";
import { bookingSchema } from "@/schemas/booking-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getSampleData(req: Request, res: Response) {
   const sampleData = await prisma.user.findMany();

   return res.status(200).send(sampleData);
}

export async function getSampleDataById(req: Request, res: Response) {
   const { id } = req.params;

   const sample = await prisma.user.findUnique({
      where: { id },
   });

   if (!sample) {
      return res.send(404);
   }

   return res.status(200).send(sample);
}

export async function createBooking(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id },
      });

      console.log(user!.id);

      if (!user) return res.status(400).json({ message: "Failed to get user", ok: false });

      const { roomId } = req.params;

      const validRoomId = await prisma.room.findUnique({
         where: { id: roomId },
      });

      if (!validRoomId) {
         return res.status(404).json({
            message: "Room not found",
            ok: false,
         });
      }

      // const parsedData = bookingSchema.parse(req.body);
      // const { startDate, endDate } = parsedData;
      const { startDate, endDate } = req.body;

      const bookingNumber = crypto.randomBytes(3).toString("hex");

      if (endDate < startDate) return res.status(400).json({ message: "Invalid Datetime", ok: false });

      const newBooking = await prisma.booking.create({
         data: {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            bookingNumber,
            roomId: validRoomId.id,
            customerId: user.id,
         },
      });

      if (!newBooking) return res.status(400).json({ message: "Failed to create booking", ok: false });

      return res.status(201).json({ data: newBooking, ok: true });
   } catch (error) {
      next(error);
   }
}
