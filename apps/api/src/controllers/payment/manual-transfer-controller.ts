import cloudinary from "@/config/cloudinary";
import { RequestWithUserId } from "@/types";
import { Request, Response, NextFunction } from "express";
import prisma from "prisma/client";
import { ZodError } from "zod";
import fs from "fs/promises";

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

      if (!req.file) {
         return res.status(400).json({ message: "No file uploaded" });
      }

      const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
         folder: "images",
      });

      const pictureUrl = cloudinaryData.secure_url;

      await prisma.booking.update({
         where: {
            bookingNumber,
         },
         data: {
            pictureUrl,
            paymentType: "MANUAL",
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
