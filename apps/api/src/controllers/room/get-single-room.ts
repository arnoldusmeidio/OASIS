import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";

export const getSingleRoom = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const roomId = req.params.roomId;

      const getRooms = await prisma.room.findUnique({
         where: {
            id: roomId,
         },
         include: {
            roomPictures: true,
         },
      });

      if (!getRooms) res.status(404).json({ message: "rooms not found" });

      return res.status(200).json({ data: getRooms, ok: true });
   } catch (error) {
      console.error(error);
   }
};
