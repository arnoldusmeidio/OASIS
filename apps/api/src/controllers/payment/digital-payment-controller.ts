import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";

export async function createDigitalPayment(req: RequestWithUserId, res: Response) {
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

      const { bookingNumber, code } = req.params;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
         include: { room: true },
      });

      if (!booking) {
         return res
            .status(404)
            .json({ message: locale == "id" ? "Booking tidak ditemukan" : "Booking not found", ok: false });
      }

      if (booking.customerId !== user.id) {
         return res.status(401).json({ message: locale == "id" ? "Tidak ada akses" : "Unauthorized", ok: false });
      }

      if (code === "0") {
         if (wallet.balance < booking.amountToPay) {
            return res
               .status(400)
               .json({ message: locale == "id" ? "Gagal pembayaran" : "Failed to create payment", ok: false });
         }

         await prisma.$transaction(async (tx) => {
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
      } else if (code === "1") {
         if (wallet.points >= booking.amountToPay) {
            await prisma.$transaction(async (tx) => {
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

      return res
         .status(200)
         .json({ message: locale == "id" ? "Berhasil membuat pembayaran " : "Successfully created payment", ok: true });
   } catch (error) {
      console.error(error);
      return res.status(500);
   }
}
