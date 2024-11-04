import prisma from "@/prisma";
import crypto from "crypto";

export default async function updateWalletBalance(wallet: any, transactionStatus: any, fraudStatus: any, data: any) {
   const walletHistory = await prisma.walletHistory.findUnique({
      where: { id: wallet.id },
      include: { wallet: true },
   });

   if (walletHistory) {
      if (transactionStatus === "capture") {
         if (fraudStatus === "accept") {
            await prisma.$transaction(async (tx) => {
               await tx.walletHistory.update({
                  where: { id: wallet.id },
                  data: {
                     value: data.gross_amount,
                     description: `Top up balance (${data.gross_amount}) using payment gateway`,
                  },
               });
               await tx.wallet.update({
                  where: { id: walletHistory.walletId },
                  data: { balance: { increment: data.gross_amount } },
               });
            });
         } else if (transactionStatus === "settlement") {
            await prisma.$transaction(async (tx) => {
               await tx.walletHistory.update({
                  where: { id: data.order_id },
                  data: {
                     value: data.gross_amount,
                     description: `Top up balance (${data.gross_amount}) using payment gateway`,
                  },
               });
               await tx.wallet.update({
                  where: { id: walletHistory.walletId },
                  data: { balance: { increment: data.gross_amount } },
               });
            });
         } else if (
            transactionStatus === "cancel" ||
            transactionStatus === "deny" ||
            transactionStatus === "expire" ||
            transactionStatus === "failure"
         ) {
            await prisma.walletHistory.delete({
               where: { id: data.order_id },
            });
         } else if (transactionStatus === "pending") {
            await prisma.walletHistory.delete({
               where: { id: data.order_id },
            });
         }
      }
   } else {
      console.error("error");
   }
}
