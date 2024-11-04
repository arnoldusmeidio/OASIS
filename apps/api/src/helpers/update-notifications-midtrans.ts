import prisma from "@/prisma";
import crypto from "crypto";
import updateBookingStatus from "./update-booking-status";
import updateWalletBalance from "./update-wallet-balance";

export default async function updateNotifications(data: any) {
   const hash = crypto
      .createHash("sha512")
      .update(`${data.order_id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
      .digest("hex");

   if (data.signature_key !== hash) {
      return { status: "error", message: "Invalid signature key" };
   }

   let transactionStatus = data.transaction_status;
   let fraudStatus = data.fraudStatus;

   const booking = await prisma.booking.findUnique({
      where: { id: data.order_id },
      include: { customer: { include: { user: true } }, room: { include: { property: true } } },
   });

   if (booking) {
      updateBookingStatus(booking, transactionStatus, fraudStatus);
   }

   const wallet = await prisma.booking.findUnique({
      where: { id: data.order_id },
   });
   if (wallet) {
      updateWalletBalance(wallet, transactionStatus, fraudStatus, data);
   }
}
