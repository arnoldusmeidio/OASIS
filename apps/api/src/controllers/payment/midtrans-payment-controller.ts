import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { MidtransClient } from "midtrans-node-client";
import { RequestWithUserId } from "@/types";
import updateBookingStatus from "@/helpers/update-booking-status";
import fs from "fs/promises";
import { Resend } from "resend";
import handlebars from "handlebars";
import path from "path";
import { format } from "date-fns";
import schedule from "node-schedule";

const resend = new Resend(process.env.RESEND_API_KEY);

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

      if (transaction) {
         const now = new Date(Date.now());
         let scheduleDate =
            now > new Date(booking.startDate)
               ? new Date().getTime() + 1000 * 10
               : new Date(booking.startDate.getDate() - 1);

         const job = schedule.scheduleJob(scheduleDate, async () => {
            try {
               const templatePath = path.join(__dirname, "../../templates", "order-reminder-template.hbs");
               const templateSource = await fs.readFile(templatePath, "utf-8");
               const compiledTemplate = handlebars.compile(templateSource);
               const html = compiledTemplate({
                  name: user.name,
                  propertyName: booking.room.property.name,
                  address: booking.room.property.address,
                  roomType: booking.room.type,
                  bookingNumber: booking.bookingNumber,
                  amountToPay: booking.amountToPay,
                  startDate: format(booking.startDate, "LLL dd, y"),
                  endDate: format(booking.endDate, "LLL dd, y"),
               });

               const { error } = await resend.emails.send({
                  from: "Oasis <booking@oasis-resort.xyz>",
                  to: [booking.customer.user.email],
                  subject: "(OASIS) Order Reminder",
                  html: html,
               });
               if (error) {
                  return res
                     .status(400)
                     .json({ message: locale == "id" ? "Terjadi kesalahan" : "Something went wrong", ok: false });
               }
            } catch (error) {
               next(error);
            } finally {
               job.cancel();
            }
         });

         const updateDate = new Date(new Date(booking.endDate).getDate() + 1);
         const updateJob = schedule.scheduleJob(updateDate, async () => {
            try {
               await prisma.booking.update({
                  where: {
                     bookingNumber: booking?.bookingNumber,
                  },
                  data: {
                     paymentStatus: "COMPLETED",
                  },
               });
            } catch (error) {
               next(error);
            } finally {
               updateJob.cancel();
            }
         });
      }

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
