import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";
import { z } from "zod";
import fs from "fs/promises";
import { Resend } from "resend";
import handlebars from "handlebars";
import path from "path";
import { format } from "date-fns";
import schedule from "node-schedule";

const resend = new Resend(process.env.RESEND_API_KEY);

export const digitalPaymentSchema = z.object({
   usePoints: z.boolean(),
});

export async function createDigitalPayment(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      let locale = req.cookies.NEXT_LOCALE;
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user)
         return res
            .status(404)
            .json({ message: locale == "id" ? "User tidak ditemukan" : "User not found", ok: false });

      const wallet = await prisma.wallet.findUnique({
         where: { id: user.id },
      });

      if (!wallet)
         return res.status(404).json({
            message: locale == "id" ? "Belum Registrasi Oasis Wallet" : "Oasis Wallet is not registered",
            ok: false,
         });

      const { bookingNumber } = req.params;
      const parsedData = digitalPaymentSchema.parse(req.body);
      const { usePoints } = parsedData;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
         include: { room: { include: { property: true } }, customer: { include: { user: true } } },
      });

      if (!booking) {
         return res
            .status(404)
            .json({ message: locale == "id" ? "Booking tidak ditemukan" : "Booking not found", ok: false });
      }

      if (booking.customerId !== user.id) {
         return res.status(401).json({ message: locale == "id" ? "Tidak ada akses" : "Unauthorized", ok: false });
      }

      if (usePoints === false) {
         if (wallet.balance < booking.amountToPay) {
            return res
               .status(400)
               .json({ message: locale == "id" ? "Gagal pembayaran" : "Failed to create payment", ok: false });
         }

         await prisma.$transaction(async (tx) => {
            await tx.booking.update({
               where: {
                  bookingNumber,
               },
               data: {
                  paymentType: "WALLET",
                  paymentStatus: "PAID",
               },
            });

            await tx.wallet.update({
               where: {
                  id: user.id,
               },
               data: {
                  balance: { decrement: booking.amountToPay },
               },
            });

            await tx.walletHistory.create({
               data: {
                  walletId: user.id,
                  description: `Digital Payment of Booking with booking number:${booking.bookingNumber}`,
                  value: booking.amountToPay,
                  types: "EXPENSE",
                  bp: "BALANCE",
               },
            });
         });
      } else if (usePoints === true) {
         if (wallet.points >= booking.amountToPay) {
            await prisma.$transaction(async (tx) => {
               await tx.booking.update({
                  where: {
                     bookingNumber,
                  },
                  data: {
                     paymentType: "WALLET",
                     paymentStatus: "PAID",
                  },
               });

               await tx.wallet.update({
                  where: {
                     id: user.id,
                  },
                  data: {
                     points: { decrement: booking.amountToPay },
                  },
               });

               await tx.walletHistory.create({
                  data: {
                     walletId: user.id,
                     description: `Digital Payment of Booking with booking number:${booking.bookingNumber}`,
                     value: booking.amountToPay,
                     types: "EXPENSE",
                     bp: "POINTS",
                  },
               });
            });
         } else {
            const newPrice = booking.amountToPay - wallet.points;
            if (wallet.balance < newPrice) {
               return res
                  .status(400)
                  .json({ message: locale == "id" ? "Gagal pembayaran" : "Failed to create payment", ok: false });
            } else {
               await prisma.$transaction(async (tx) => {
                  await tx.booking.update({
                     where: {
                        bookingNumber,
                     },
                     data: {
                        paymentType: "WALLET",
                        paymentStatus: "PAID",
                     },
                  });

                  await tx.wallet.update({
                     where: {
                        id: user.id,
                     },
                     data: {
                        balance: { decrement: newPrice },
                        points: 0,
                     },
                  });

                  await tx.walletHistory.create({
                     data: {
                        walletId: user.id,
                        description: `Digital Payment of Booking with booking number:${booking.bookingNumber}`,
                        value: newPrice,
                        types: "EXPENSE",
                        bp: "BOTH",
                     },
                  });
               });
            }
         }
      } else {
         return res.status(403).json({ message: locale == "id" ? "Permintaan ditolak" : "Bad request", ok: false });
      }

      const templatePath = path.join(__dirname, "../../templates", "booking-templates.hbs");
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
         subject: "(OASIS) Booking Details",
         html: html,
      });
      if (error) {
         return res
            .status(400)
            .json({ message: locale == "id" ? "Terjadi kesalahan" : "Something went wrong", ok: false });
      }

      const now = new Date(Date.now());
      let scheduleDate =
         now > new Date(booking.startDate)
            ? new Date().getTime() + 1000 * 10
            : new Date(booking.startDate.setDate(booking.startDate.getDate() - 1));

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

      const updateDate = new Date(booking.endDate.setDate(booking.endDate.getDate() + 1));
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

      return res
         .status(200)
         .json({ message: locale == "id" ? "Berhasil membuat pembayaran " : "Successfully created payment", ok: true });
   } catch (error) {
      next(error);
      return res.status(500);
   }
}
