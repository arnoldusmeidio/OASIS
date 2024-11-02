import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getBookingsTenant(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      let locale = req.cookies.NEXT_LOCALE;
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, tenant: { id } },
      });

      if (!user)
         return res
            .status(404)
            .json({ message: locale == "id" ? "User tidak ditemukan" : "User not found", ok: false });

      const property = await prisma.property.findMany({
         where: { tenantId: user.id },
         include: { room: { include: { bookings: true } } },
      });

      if (!property) {
         return res.status(200).json({
            data: property,
            message: locale == "id" ? "Booking tidak ditemukan" : "Booking not found",
            ok: true,
         });
      }

      return res.status(200).json({ data: property, ok: true });
   } catch (error) {
      next(error);
   }
}

export async function getBookingPictureUrlByBookingNumber(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      let locale = req.cookies.NEXT_LOCALE;
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, tenant: { id } },
      });

      if (!user)
         return res
            .status(404)
            .json({ message: locale == "id" ? "User tidak ditemukan" : "User not found", ok: false });

      const { bookingNumber } = req.params;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, paymentType: "MANUAL" },
         include: { room: { include: { property: true } } },
      });

      if (!booking) {
         return res.status(404).json({
            message: locale == "id" ? "Booking tidak ditemukan" : "Booking not found",
            ok: false,
         });
      }

      if (booking.room.property.tenantId !== user.id) {
         return res.status(401).json({
            message: locale == "id" ? "Tidak ada akses" : "Unauthorized",
            ok: false,
         });
      }

      if (!booking?.pictureUrl) {
         return res.status(404).json({
            message: locale == "id" ? "Gambar tidak ditemukan" : "Picture not found",
            ok: false,
         });
      }

      return res.status(200).json({ data: booking.pictureUrl, ok: true });
   } catch (error) {
      next(error);
   }
}

export async function approveManualTransferPayment(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      let locale = req.cookies.NEXT_LOCALE;
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, tenant: { id } },
      });

      if (!user)
         return res
            .status(404)
            .json({ message: locale == "id" ? "User tidak ditemukan" : "User not found", ok: false });

      const { bookingNumber } = req.params;
      const { ok } = req.body;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, paymentType: "MANUAL", paymentStatus: "PROCESSING" },
         include: { customer: { include: { user: true } }, room: { include: { property: true } } },
      });

      if (!booking) {
         return res.status(404).json({
            message: locale == "id" ? "Booking tidak ditemukan" : "Booking not found",
            ok: false,
         });
      }

      if (booking.room.property.tenantId !== user.id) {
         return res.status(401).json({
            message: locale == "id" ? "Tidak ada akses" : "Unauthorized",
            ok: false,
         });
      }

      if (!booking?.pictureUrl) {
         return res.status(404).json({
            message: locale == "id" ? "Gambar tidak ditemukan" : "Picture not found",
            ok: false,
         });
      }

      if (ok) {
         await prisma.$transaction(async (tx) => {
            await prisma.booking.update({
               where: { bookingNumber: booking.bookingNumber },
               data: { paymentStatus: "APPROVED" },
            });

            // const { error } = await resend.emails.send({
            //    from: "Oasis <oasis.app@resend.dev>",
            //    to: [booking.customer.user.email],
            //    subject: "Your Booking (OASIS)",
            //    html: `<h1>Booking Details</h1><p>Here is your booking details:${booking?.bookingNumber}, please confirm.</p>`,
            // });

            // if (error) {
            //    return res
            //       .status(400)
            //       .json({ message: locale == "id" ? "Terjadi kesalahan" : "Something went wrong", ok: false });
            // }
         });
         return res
            .status(200)
            .json({ message: locale == "id" ? "Booking berhasil dikonfirmasi." : "Booking confirmed.", ok: true });
      } else {
         await prisma.booking.update({
            where: { bookingNumber: booking.bookingNumber },
            data: { paymentStatus: "PENDING" },
         });
         return res.status(200).json({
            message: locale == "id" ? "Booking berhasil dibatalkan." : "Booking successfully canceled.",
            ok: true,
         });
      }
   } catch (error) {
      next(error);
   }
}
