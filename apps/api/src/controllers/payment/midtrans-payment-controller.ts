import { Request, Response } from "express";
import prisma from "@/prisma";
import { MidtransClient } from "midtrans-node-client";
import { v4 as uuid } from "uuid";
import { RequestWithUserId } from "@/types";
import updateBookingStatus from "@/helpers/update-booking-status";

const snap = new MidtransClient.Snap({
   isProduction: false,
   serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// interface RoomPrice {
//    roomId: string;
//    price: number;
//    startDate: Date;
//    endDate: Date;
// }

async function getPriceForDate(date: Date, roomId: string, defaultPrice: number) {
   const peakSeasons = await prisma.roomPrice.findMany({
      where: { roomId },
   });
   const season = peakSeasons.find((season) => date >= season.startDate && date <= season.endDate);
   return season ? season.price : defaultPrice;
}

export async function createPayment(req: RequestWithUserId, res: Response) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

      const { bookingNumber } = req.params;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
         include: { room: true },
      });

      if (!booking) {
         return res.status(404).json({ message: "No bookings found", ok: false });
      }

      if (booking.customerId !== user.id) {
         return res.status(401).json({ message: "Unauthorized", ok: false });
      }

      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate = new Date(booking.startDate).getTime();
      //console.log(booking.startDate);
      const secondDate = new Date(booking.endDate).getTime();
      //console.log(booking.endDate);
      const diffDays = Math.ceil(Math.abs((firstDate - secondDate) / oneDay));
      //console.log(diffDays);
      //   const amount = booking.room.defaultPrice * diffDays;
      //   console.log(amount);

      let totalPrice = 0;

      for (let i = 0; i < diffDays; i++) {
         const currentDate = new Date(booking.startDate);
         currentDate.setDate(booking.startDate.getDate() + i);

         const priceForDate = getPriceForDate(currentDate, booking.roomId, booking.room.defaultPrice);
         totalPrice += await priceForDate;
      }

      //   console.log(totalPrice);

      const orderId = uuid();
      //return res.status(201).json({ ok: true });
      const parameter = {
         transaction_details: {
            order_id: orderId,
            gross_amount: totalPrice,
         },
         //  item_details: [
         //     {
         //        id: "ITEM1",
         //        price: 10000,
         //        quantity: 1,
         //        name: "Midtrans Bear",
         //        brand: "Midtrans",
         //        category: "Toys",
         //        merchant_name: "Midtrans",
         //        url: "https://tokobuah.com/apple-fuji",
         //     },
         //  ],
         customer_details: {
            first_name: user.name,
            last_name: user.name,
            email: user.email,
         },
         callbacks: {
            finish: "http://localhost:3000",
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
      updateBookingStatus(data);
      res.status(200);
   } catch (error) {
      console.error(error);
      return res.status(500);
   }
}
