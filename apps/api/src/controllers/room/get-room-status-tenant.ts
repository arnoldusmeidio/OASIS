import { Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTenantRoomStatus(req: Request, res: Response) {
   const { roomId } = req.params;
   try {
      const status = await prisma.room.findUnique({
         where: { id: roomId },
         include: {
            roomPrice: { select: { startDate: true, endDate: true, price: true } },
            bookings: {
               select: { startDate: true, endDate: true, paymentStatus: true },
            },
         },
      });

      if (!status) {
         return res.status(404).json({ message: "No rooms found", ok: false });
      }

      return res.status(200).json({
         data: {
            id: status?.id,
            type: status?.type,
            defaultPrice: status?.defaultPrice,
            roomPrice: status?.roomPrice,
            bookings: status?.bookings,
         },
      });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ response: { ok: false }, message: "Server error" });
   }
}
