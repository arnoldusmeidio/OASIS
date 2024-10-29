// import { NextFunction, Request, Response } from "express";
// import prisma from "@/prisma";
// import cloudinary from "@/config/cloudinary";
// import fs from "fs/promises";

// export async function editRoom(req: Request, res: Response, next: NextFunction) {
//    try {
//       const roomId = req.params;

//       const {};

//       if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
//          return res.status(400).json({ message: "No files uploaded" });
//       }

//       // Upload each file to Cloudinary and collect URLs
//       const pictureUrls = await Promise.all(
//          (req.files as Express.Multer.File[]).map(async (file) => {
//             try {
//                const cloudinaryData = await cloudinary.uploader.upload(file.path, {
//                   folder: "images",
//                });
//                // Remove file after upload
//                await fs.unlink(file.path);
//                return { url: cloudinaryData.secure_url }; // Return the URL
//             } catch (uploadError) {
//                console.error("Error uploading file:", uploadError);
//                throw new Error("Error uploading one or more files");
//             }
//          }),
//       );

//       await prisma.room.update({});
//    } catch (error) {
//       next(error);
//       console.error(error);
//    }
// }
