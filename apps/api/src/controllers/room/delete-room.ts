// import { NextFunction, Request, Response } from "express";
// import prisma from "@/prisma";
// import cloudinary from "@/config/cloudinary";

// export const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
//    try {
//       const roomId = req.params.roomId;

//       const room = await prisma.room.findUnique({
//          where: {
//             id: roomId,
//          },
//       });

//       if (!room) {
//          return res.status(404).json({ message: "room not found" });
//       }

//       const publicId = room.pictureUrl?.split("/").pop()?.split(".")[0];
//       if (publicId) {
//          await cloudinary.uploader.destroy(`images/${publicId}`);
//       }

//       await prisma.room.delete({
//          where: {
//             id: roomId,
//          },
//       });

//       return res.status(200).json({
//          messaage: "room succesfully deleted",
//       });
//    } catch (error) {
//       next(error);
//       console.error(error);
//    }
// };
