import prisma from "@/prisma";
import crypto from "crypto";

export default async function updateBookingStatus(data: any) {
   const hash = crypto
      .createHash("sha512")
      .update(`${data.order_id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
      .digest("hex");

   if (data.signature_key !== hash) {
      return { status: "error", message: "Invalid signature key" };
   }

   let transactionStatus = data.transaction_status;
   let fraudStatus = data.fraudStatus;

   if (transactionStatus === "capture") {
      if (fraudStatus === "accept") {
         await prisma.booking.update({
            where: { id: data.booking_id },
            data: { paymentStatus: "PAID" },
         });
      }
   } else if (transactionStatus === "settlement") {
      await prisma.booking.update({
         where: { id: data.booking_id },
         data: { paymentStatus: "PAID" },
      });
   } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire" ||
      transactionStatus === "failure"
   ) {
      await prisma.booking.update({
         where: { id: data.booking_id },
         data: { paymentStatus: "PENDING" },
      });
   } else if (transactionStatus === "pending") {
      await prisma.booking.update({
         where: { id: data.booking_id },
         data: { paymentStatus: "PENDING" },
      });
   }
}
