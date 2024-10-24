import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";

export async function redeemRefCode(req: RequestWithUserId, res: Response, next: NextFunction) {
   try {
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
         include: { customer: {}, wallet: {} },
      });

      if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });
      if (user.customer?.hasRedeemedRefCode)
         return res.status(400).json({ message: "Already redeemed a code", ok: false });

      const { refCode } = req.body;

      const validRefCode = await prisma.customer.findUnique({
         where: { refCode },
      });

      if (!validRefCode) {
         return res.status(400).json({ message: "Invalid Referral Code", ok: false });
      }

      if (validRefCode.id == user.id) {
         return res.status(400).json({ message: "Cannot redeem this Referral Code", ok: false });
      }

      await prisma.wallet.update({
         where: {
            id: user.id,
         },
         data: {
            points: 10000,
         },
      });

      await prisma.$transaction(async (tx) => {
         await tx.wallet.update({
            where: {
               id: user.id,
            },
            data: {
               points: { increment: 10000 },
            },
         });

         await tx.customer.update({
            where: {
               id: user.id,
            },
            data: {
               hasRedeemedRefCode: true,
            },
         });
      });

      return res.status(200).json({ message: "Code successfully redeemed. ", ok: true });
   } catch (error) {
      next(error);
   }
}
