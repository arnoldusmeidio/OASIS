import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { MidtransClient } from "midtrans-node-client";
import { RequestWithUserId } from "@/types";
import updateNotifications from "@/helpers/update-notifications-midtrans";

const snap = new MidtransClient.Snap({
   isProduction: false,
   serverKey: process.env.MIDTRANS_SERVER_KEY,
});

async function getPriceForDate(date: Date, roomId: string, defaultPrice: number) {
   const peakSeasons = await prisma.roomPrice.findMany({
      where: { roomId },
   });
   const season = peakSeasons.find((season) => date >= season.startDate && date <= season.endDate);
   return season ? season.price : defaultPrice;
}

export async function createPayment(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      let locale = req.cookies.NEXT_LOCALE;
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

      const { bookingNumber } = req.params;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
         include: { customer: { include: { user: true } }, room: { include: { property: true } } },
      });

      if (!booking) {
         return res.status(404).json({ message: "No bookings found", ok: false });
      }

      if (booking.customerId !== user.id) {
         return res.status(401).json({ message: "Unauthorized", ok: false });
      }

      const totalPrice = booking.amountToPay;

      const orderId = booking.id;

      const parameter = {
         transaction_details: {
            order_id: orderId,
            gross_amount: totalPrice,
         },
         customer_details: {
            first_name: user.name,
            last_name: user.name,
            email: user.email,
         },
         callbacks: {
            finish: process.env.CLIENT_PORT,
         },
      };
      const transaction = await snap.createTransaction(parameter);

      return res.status(201).json({ ok: true, data: { transaction } });
   } catch (error) {
      console.error(error);
      return res.status(500);
   }
}

export async function paymentNotification(req: Request, res: Response) {
   const data = req.body;

   try {
      updateNotifications(data);
      res.status(200);
   } catch (error) {
      console.error(error);
      return res.status(500);
   }
}
