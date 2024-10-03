import { Request, Response } from "express";
import prisma from "@/prisma";

export async function getSampleData(req: Request, res: Response) {
   const sampleData = await prisma.user.findMany();

   return res.status(200).send(sampleData);
}

export async function getSampleDataById(req: Request, res: Response) {
   const { id } = req.params;

   const sample = await prisma.user.findUnique({
      where: { id },
   });

   if (!sample) {
      return res.send(404);
   }

   return res.status(200).send(sample);
}

export async function createSampleData(req: Request, res: Response) {
   const { name, email, password } = req.body;

   const newSampleData = await prisma.user.create({
      data: { name, email, password },
   });

   return res.status(201).send(newSampleData);
}
