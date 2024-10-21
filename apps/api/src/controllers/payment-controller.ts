import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";
import cloudinary from "@/config/cloudinary";
import fs from "fs/promises";

// export async function createEvent(req: Request, res: Response, next: NextFunction) {
//    try {
//       const { eventName, price, location, description, datetime, availableSeat, isPaid } = req.body;

//       if (!req.file) {
//          return res.status(400).json({ message: "No file uploaded" });
//       }

//       const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
//          folder: "images",
//       });

//       await prisma.events.create({
//          data: {
//             eventName,
//             price: +price,
//             description,
//             location,
//             datetime: new Date(datetime),
//             availableSeat: +availableSeat,
//             isPaid: isPaid === "paid" ? true : false,
//             imageUrl: cloudinaryData.secure_url,
//          },
//       });

//       fs.unlink(req.file.path);

//       res.status(201).json({ message: "Event created" });
//    } catch (error) {
//       next(error);
//    }
// }
