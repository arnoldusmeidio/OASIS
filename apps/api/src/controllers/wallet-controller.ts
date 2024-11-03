import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { RequestWithUserId } from "@/types";
import { MidtransClient } from "midtrans-node-client";
import updateWalletBalance from "@/helpers/update-wallet-balance";

const snap = new MidtransClient.Snap({
   isProduction: false,
   serverKey: process.env.MIDTRANS_SERVER_KEY,
});

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

      await prisma.$transaction(async (tx) => {
         await tx.wallet.update({
            where: {
               id: user.id,
            },
            data: {
               points: { increment: 10000 },
            },
         });

         await tx.wallet.update({
            where: {
               id: validRefCode.id,
            },
            data: {
               points: { increment: 20000 },
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

         await tx.walletHistory.create({
            data: {
               walletId: user.id,
               description: `Referral Code Redemption`,
               value: 20000,
               types: "INCOME",
               bp: "POINTS",
            },
         });

         await tx.walletHistory.create({
            data: {
               walletId: validRefCode.id,
               description: `Referral Code Redemption`,
               value: 10000,
               types: "INCOME",
               bp: "POINTS",
            },
         });
      });

      return res.status(200).json({ message: "Code successfully redeemed. ", ok: true });
   } catch (error) {
      next(error);
   }
}

export async function topUpWallet(req: RequestWithUserId, res: Response) {
   try {
      let locale = req.cookies.NEXT_LOCALE;
      const id = (req as RequestWithUserId).user?.id;
      const user = await prisma.user.findUnique({
         where: { id, customer: { id } },
      });

      if (!user)
         return res
            .status(404)
            .json({ message: locale == "id" ? "User tidak ditemukan" : "User not found", ok: false });

      const wallet = await prisma.wallet.findUnique({
         where: { id: user.id },
      });

      if (!wallet)
         return res.status(404).json({
            message: locale == "id" ? "Belum Registrasi Oasis Wallet" : "Oasis Wallet is not registered",
            ok: false,
         });

      const { amount } = req.body;

      if (!amount) {
         return res.status(403).json({
            message: locale == "id" ? "Permintaan ditolak" : "Bad Request",
            ok: false,
         });
      }

      const history = await prisma.walletHistory.create({
         data: {
            walletId: wallet.id,
            description: "Top up using payment gateway in progress",
            types: "INCOME",
            bp: "BALANCE",
            value: 0,
         },
      });

      const parameter = {
         transaction_details: {
            order_id: history.id,
            gross_amount: Number(amount),
         },
         customer_details: {
            first_name: user.name,
            last_name: user.name,
            email: user.email,
         },
         callbacks: {
            finish: process.env.CLIENT_PORT,
         },
      };
      const transaction = await snap.createTransaction(parameter);
      return res.status(201).json({ ok: true, data: { transaction } });
   } catch (error) {
      console.error(error);
      return res.status(500);
   }
}

export async function topUpNotification(req: Request, res: Response) {
   const data = req.body;

   try {
      updateWalletBalance(data);
      res.status(200);
   } catch (error) {
      console.error(error);
      return res.status(500);
   }
}
