// import { NextFunction, Request, Response } from "express";
// import prisma from "@/prisma";
// import cloudinary from "@/config/cloudinary";
// import { RequestWithUserId } from "@/types";
// import fs from "fs/promises";

// // Create property
// export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
//    try {
//       const id = (req as RequestWithUserId).user?.id;

//       const user = await prisma.user.findUnique({
//          where: { id },
//          include: { tenant: true },
//       });

//       const tenantId = user?.tenant?.id;

//       if (!tenantId) {
//          return res.status(400).json({ message: "Tenant ID not found" });
//       }

//       const { propertyName, propertyAddress, propertyDescription, category } = req.body;

//       // Check if files were uploaded
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
//                return { name: cloudinaryData.secure_url }; // Return the URL
//             } catch (uploadError) {
//                console.error("Error uploading file:", uploadError);
//                throw new Error("Error uploading one or more files");
//             }
//          }),
//       );

//       // Create property with associated picture URLs
//       const property = await prisma.property.create({
//          data: {
//             tenantId,
//             name: propertyName,
//             address: propertyAddress,
//             description: propertyDescription,
//             category,
//             pictureUrl: {
//                create: pictureUrls,
//             },
//          },
//       });

//       return res.status(201).json({ message: "Property created", property });
//    } catch (error) {
//       next(error);
//    }
// };
