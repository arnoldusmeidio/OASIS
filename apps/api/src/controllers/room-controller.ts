import { Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getRoomStatus(req: Request, res: Response) {
   const { id } = req.params;

   try {
      const status = await prisma.room.findUnique({
         where: { id: id },
         include: {
            RoomPrice: { select: { startDate: true, endDate: true, price: true } },
            bookings: {
               select: { startDate: true, endDate: true, paymentStatus: true },
            },
         },
      });

      return res.status(200).json({
         data: {
            id: status?.id,
            type: status?.type,
            defaultPrice: status?.defaultPrice,
            roomPrice: status?.RoomPrice,
            bookings: status?.bookings,
         },
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ response: { ok: false }, message: "Server error" });
   }
}
