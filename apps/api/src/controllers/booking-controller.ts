import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import crypto from "crypto";
import { RequestWithUserId } from "@/types";
import { Resend } from "resend";

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

export async function createBooking(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id },
         include: { customer: true },
      });

      if (!user) return res.status(400).json({ message: "Failed to get user", ok: false });

      //const parsedData = req.body
      const { startDate, endDate, roomId, customerId } = req.body;

      const bookingNumber = crypto.randomBytes(3).toString("hex");

      const newBooking = await prisma.booking.create({
         data: {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            bookingNumber,
            roomId: roomId,
            customerId: customerId,
         },
      });

      if (!newBooking) return res.status(400).json({ message: "Failed to create booking", ok: false });

      const token = crypto.randomBytes(20).toString("hex");
      const confirmationLink = `http://localhost:${process.env.PORT}/api/v1/auth/confirm-email?token=${token}`;

      const { data, error } = await resend.emails.send({
         from: "Oasis <oasis@resend.dev>",
         to: [user.email],
         subject: "Email Confirmation (Oasis)",
         html: `<strong>Hello, ${
            user.name
         }!</strong><p> Please confirm your email by clicking on the following link: <a href="${confirmationLink}">Confirmation Link</a></p>`,
      });

      return res.status(201).json({ data: newBooking, ok: true });
   } catch (error) {
      next(error);
   }
}
