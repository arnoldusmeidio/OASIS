import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";
import crypto from "crypto";
import { PaymentStatus } from "@prisma/client";

async function getPriceForDate(date: Date, roomId: string, defaultPrice: number) {
   const peakSeasons = await prisma.roomPrice.findMany({
      where: { roomId },
   });
   const season = peakSeasons.find((season) => date >= season.startDate && date <= season.endDate);
   return season ? season.price : defaultPrice;
}

export async function getBookings(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

      const bookings = await prisma.booking.findMany({
         where: { customerId: user.id },
         include: { room: { include: { property: true } } },
         orderBy: { createdAt: "asc" },
      });

      if (!bookings) {
         return res.status(200).json({ data: bookings, message: "No bookings found", ok: true });
      }

      return res.status(200).json({ data: bookings, ok: true });
   } catch (error) {
      next(error);
   }
}

export async function getBookingsSorted(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

      const { code } = req.params || "1X";
      if (code.length !== 2) {
         return res.status(400).json({ message: "Bad Request", ok: false });
      }

      const sort = code.slice(0, 1);
      const filterCode = code.slice(1, 2);

      let bookings;

      //if no filter code
      if (filterCode === "X") {
         if (sort === "1") {
            bookings = await prisma.booking.findMany({
               where: { customerId: user.id },
               include: { room: { include: { property: true } } },
               orderBy: { createdAt: "asc" },
            });
         } else if (sort === "2") {
            bookings = await prisma.booking.findMany({
               where: { customerId: user.id },
               include: { room: { include: { property: true } } },
               orderBy: { createdAt: "desc" },
            });
         } else if (sort === "3") {
            bookings = await prisma.booking.findMany({
               where: { customerId: user.id },
               include: { room: { include: { property: true } } },
               orderBy: { startDate: "asc" },
            });
         } else if (sort === "4") {
            bookings = await prisma.booking.findMany({
               where: { customerId: user.id },
               include: { room: { include: { property: true } } },
               orderBy: { startDate: "desc" },
            });
         } else {
            return res.status(400).json({ message: "Bad Request", ok: false });
         }

         if (!bookings) {
            return res.status(200).json({ data: bookings, message: "No bookings found", ok: true });
         }

         return res.status(200).json({ data: bookings, ok: true });
      }

      let filter = "PENDING" as PaymentStatus;
      //if has filter code
      if (filterCode === "A") {
         filter = "PENDING";
      } else if (filterCode === "B") {
         filter = "PAID";
      } else if (filterCode === "C") {
         filter = "CANCELED";
      } else if (filterCode === "D") {
         filter = "PROCESSING";
      } else if (filterCode === "E") {
         filter = "APPROVED";
      } else if (filterCode === "F") {
         filter = "COMPLETED";
      } else {
         return res.status(400).json({ message: "Bad Request", ok: false });
      }

      if (sort === "1") {
         bookings = await prisma.booking.findMany({
            where: { customerId: user.id, paymentStatus: filter },
            include: { room: { include: { property: true } } },
            orderBy: { createdAt: "asc" },
         });
      } else if (sort === "2") {
         bookings = await prisma.booking.findMany({
            where: { customerId: user.id, paymentStatus: filter },
            include: { room: { include: { property: true } } },
            orderBy: { createdAt: "desc" },
         });
      } else if (sort === "3") {
         bookings = await prisma.booking.findMany({
            where: { customerId: user.id, paymentStatus: filter },
            include: { room: { include: { property: true } } },
            orderBy: { startDate: "asc" },
         });
      } else if (sort === "4") {
         bookings = await prisma.booking.findMany({
            where: { customerId: user.id, paymentStatus: filter },
            include: { room: { include: { property: true } } },
            orderBy: { startDate: "desc" },
         });
      } else {
         return res.status(400).json({ message: "Bad Request", ok: false });
      }

      if (!bookings) {
         return res.status(200).json({ data: bookings, message: "No bookings found", ok: true });
      }

      return res.status(200).json({ data: bookings, ok: true });
   } catch (error) {
      next(error);
   }
}

export async function getBookingsByBookingNumber(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

      const { bookingNumber } = req.params;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, customerId: user.id },
         include: { room: { include: { property: true } }, customer: { include: { user: true } } },
      });

      if (!booking) {
         return res.status(404).json({ message: "No bookings found", ok: false });
      }

      return res.status(200).json({ data: booking, ok: true });
   } catch (error) {
      next(error);
   }
}

export async function deleteBookingByBookingNumber(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

      const { bookingNumber } = req.params;

      const booking = await prisma.booking.findUnique({
         where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
      });

      if (!booking) {
         return res.status(404).json({ message: "No bookings found", ok: false });
      }

      await prisma.booking.delete({
         where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
      });

      return res.status(200).json({ message: "Booking cancelled", ok: true });
   } catch (error) {
      next(error);
   }
}

export async function createBooking(req: Request, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user) return res.status(400).json({ message: "Failed to get user", ok: false });

      const { roomId } = req.params;

      const validRoom = await prisma.room.findUnique({
         where: { id: roomId },
      });

      if (!validRoom) {
         return res.status(404).json({
            message: "Room not found",
            ok: false,
         });
      }

      const { date } = req.body;
      const bookingNumber = crypto.randomBytes(3).toString("hex").toUpperCase();

      //if (endDate < startDate) return res.status(400).json({ message: "Invalid Datetime", ok: false });
      if (!date) return res.status(400).json({ message: "Invalid Datetime", ok: false });

      const startDate = new Date(date.from.slice(0, 10).concat("T17:00:00.000Z"));
      const endDate = new Date(
         date.to ? date.to.slice(0, 10).concat("T17:00:00.000Z") : date.from.slice(0, 10).concat("T17:00:00.000Z"),
      );

      const newBooking = { startDate, endDate };

      const existingBookings = await prisma.booking.findMany({
         where: {
            roomId: validRoom!.id,
            AND: [
               {
                  startDate: {
                     lt: new Date(endDate), // Existing booking starts before new booking ends
                  },
               },
               {
                  endDate: {
                     gt: new Date(startDate), // Existing booking ends after new booking starts
                  },
               },
            ],
         },
      });

      const isDateRangeAvailable = (
         existingBookings: { startDate: Date; endDate: Date }[],
         newBooking: { startDate: Date; endDate: Date },
      ) => {
         const newStart = newBooking.startDate;
         const newEnd = newBooking.endDate;

         for (const booking of existingBookings) {
            const existingStart = booking.startDate;
            const existingEnd = booking.endDate;

            // Check for overlap
            if (!(newEnd < existingStart || newStart > existingEnd)) {
               return false; // Overlap exists
            }
         }
         return true; // No overlap
      };

      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate = new Date(startDate).getTime();
      const secondDate = new Date(endDate).getTime();
      const diffDays = Math.ceil(Math.abs((firstDate - secondDate) / oneDay));

      let totalPrice = 0;

      if (diffDays === 0) {
         const currentDate = new Date(startDate);
         const priceForDate = getPriceForDate(currentDate, validRoom.id, validRoom.defaultPrice);
         totalPrice += await priceForDate;
      } else {
         for (let i = 0; i < diffDays; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);

            const priceForDate = getPriceForDate(currentDate, validRoom.id, validRoom.defaultPrice);
            totalPrice += await priceForDate;
         }
      }

      if (isDateRangeAvailable(existingBookings, newBooking)) {
         const createBooking = await prisma.booking.create({
            data: {
               startDate,
               endDate,
               bookingNumber,
               roomId,
               customerId: user.id,
               paymentStatus: "PENDING",
               amountToPay: totalPrice,
            },
         });

         if (!createBooking) return res.status(400).json({ message: "Error while creating booking", ok: false });

         return res.status(201).json({ data: createBooking, ok: true });
      } else {
         return res.status(400).json({ message: "Failed to create booking", ok: false });
      }
   } catch (error) {
      next(error);
   }
}
