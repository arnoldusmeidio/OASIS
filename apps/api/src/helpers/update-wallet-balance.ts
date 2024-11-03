import prisma from "@/prisma";
import crypto from "crypto";

export default async function updateWalletBalance(data: any) {
   const hash = crypto
      .createHash("sha512")
      .update(`${data.order_id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
      .digest("hex");

   if (data.signature_key !== hash) {
      return { status: "error", message: "Invalid signature key" };
   }

   let transactionStatus = data.transaction_status;
   let fraudStatus = data.fraudStatus;

   const wallet = await prisma.walletHistory.findUnique({
      where: { id: data.order_id },
      include: { wallet: true },
   });

   if (wallet) {
      if (transactionStatus === "capture") {
         if (fraudStatus === "accept") {
            await prisma.$transaction(async (tx) => {
               await tx.walletHistory.update({
                  where: { id: data.order_id },
                  data: {
                     value: data.gross_amount,
                     description: `Top up balance (${data.gross_amount}) using payment gateway`,
                  },
               });
               await tx.wallet.update({
                  where: { id: wallet?.walletId },
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
                  where: { id: wallet?.walletId },
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
         console.log("updated");
      }
   } else {
      console.error("error");
   }
}
