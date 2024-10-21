import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import cloudinary from "@/config/cloudinary";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { roomName, roomDescription, roomCapacity, roomPrice, roomPictureUrl } = req.body;
   } catch (error) {
      next(error);
   }
};
