import cloudinary from "@/config/cloudinary";
import { RequestWithUserId } from "@/types";
import { Request, Response, NextFunction } from "express";
import prisma from "prisma/client";
import { ZodError } from "zod";
import fs from "fs/promises";
import { Resend } from "resend";
import handlebars from "handlebars";
import path from "path";
import { format } from "date-fns";
import schedule from "node-schedule";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function uploadPaymentProof(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      let locale = req.cookies.NEXT_LOCALE;
      const id = (req as RequestWithUserId).user?.id;

      const { bookingNumber } = req.params;

      const user = await prisma.user.findUnique({
         where: {
            id: id,
         },
      });

      if (!user)
         return res.status(404).json({
            message: locale == "id" ? "User tidak ditemukan" : "User not found",
            ok: false,
         });

      const booking = await prisma.booking.findUnique({
         where: {
            bookingNumber,
            customerId: user.id,
            paymentStatus: "PENDING",
         },
      });

      if (!user)
         return res.status(404).json({
            message: locale == "id" ? "Booking tidak ditemukan" : "Booking not found",
            ok: false,
         });

      if (!req.file) {
         return res.status(400).json({ message: "No file uploaded" });
      }

      const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
         folder: "images",
      });

      const pictureUrl = cloudinaryData.secure_url;

      await prisma.booking.update({
         where: {
            bookingNumber: booking?.bookingNumber,
         },
         data: {
            pictureUrl,
            paymentType: "MANUAL",
            paymentStatus: "PROCESSING",
         },
      });

      fs.unlink(req.file.path);

      return res.status(200).json({
         message: locale == "id" ? "Berhasil upload bukti pembayaran" : "Uploaded payment proof",
         ok: true,
      });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}

export async function confirmBookingTf(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      let locale = req.cookies.NEXT_LOCALE;
      const id = (req as RequestWithUserId).user?.id;

      const { bookingNumber } = req.params;

      const user = await prisma.user.findUnique({
         where: {
            id: id,
         },
      });

      if (!user)
         return res.status(404).json({
            message: locale == "id" ? "User tidak ditemukan" : "User not found",
            ok: false,
         });

      const booking = await prisma.booking.findUnique({
         where: {
            bookingNumber,
            customerId: user.id,
            paymentStatus: "APPROVED",
         },
         include: { customer: { include: { user: true } }, room: { include: { property: true } } },
      });

      if (!booking)
         return res.status(404).json({
            message: locale == "id" ? "Booking tidak ditemukan" : "Booking not found",
            ok: false,
         });

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

      await prisma.booking.update({
         where: {
            bookingNumber: booking?.bookingNumber,
         },
         data: {
            paymentStatus: "PAID",
         },
      });

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

      return res.status(200).json({
         message: locale == "id" ? "Berhasil confirmasi" : "Confirmation success",
         ok: true,
      });
   } catch (error) {
      if (error instanceof ZodError) {
         return res.status(400).json({ message: error.errors[0].message, ok: false });
      } else {
         next(error);
      }
   }
}
