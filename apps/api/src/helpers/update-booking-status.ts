import prisma from "@/prisma";
import fs from "fs/promises";
import { Resend } from "resend";
import handlebars from "handlebars";
import path from "path";
import { format } from "date-fns";
import schedule from "node-schedule";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function updateBookingStatus(bookingData: any, transactionStatus: any, fraudStatus: any) {
   const booking = await prisma.booking.findUnique({
      where: { id: bookingData.id },
      include: { customer: { include: { user: true } }, room: { include: { property: true } } },
   });

   if (booking) {
      if (transactionStatus === "capture") {
         if (fraudStatus === "accept") {
            await prisma.booking.update({
               where: { id: booking.id },
               data: { paymentStatus: "PAID" },
            });
         }
      } else if (transactionStatus === "settlement") {
         await prisma.booking.update({
            where: { id: booking.id },
            data: { paymentStatus: "PAID" },
         });
      } else if (
         transactionStatus === "cancel" ||
         transactionStatus === "deny" ||
         transactionStatus === "expire" ||
         transactionStatus === "failure"
      ) {
         await prisma.booking.update({
            where: { id: booking.id },
            data: { paymentStatus: "PENDING" },
         });
      } else if (transactionStatus === "pending") {
         await prisma.booking.update({
            where: { id: booking.id },
            data: { paymentStatus: "PENDING" },
         });
      }

      await prisma.booking.update({
         where: { id: booking.id },
         data: { paymentType: "PAYGATE" },
      });

      try {
         const templatePath = path.join(__dirname, "../templates", "booking-templates.hbs");
         const templateSource = await fs.readFile(templatePath, "utf-8");
         const compiledTemplate = handlebars.compile(templateSource);
         const html = compiledTemplate({
            name: booking.customer.user.name,
            propertyName: booking.room.property.name,
            address: booking.room.property.address,
            roomType: booking.room.type,
            bookingNumber: booking.bookingNumber,
            amountToPay: booking.amountToPay,
            startDate: format(booking.startDate, "LLL dd, y"),
            endDate: format(booking.endDate, "LLL dd, y"),
         });

         await resend.emails.send({
            from: "Oasis <booking@oasis-resort.xyz>",
            to: [booking.customer.user.email],
            subject: "(OASIS) Booking Details",
            html: html,
         });
      } catch (error) {
         console.error("error disini");
      }
      const now = new Date(Date.now());
      let scheduleDate =
         now > new Date(booking.startDate)
            ? new Date().getTime() + 1000 * 10
            : new Date(booking.startDate.setDate(booking.startDate.getDate() - 1));

      const job = schedule.scheduleJob(scheduleDate, async () => {
         try {
            const templatePath = path.join(__dirname, "../templates", "order-reminder-template.hbs");
            const templateSource = await fs.readFile(templatePath, "utf-8");
            const compiledTemplate = handlebars.compile(templateSource);
            const html = compiledTemplate({
               name: booking.customer.user.name,
               propertyName: booking.room.property.name,
               address: booking.room.property.address,
               roomType: booking.room.type,
               bookingNumber: booking.bookingNumber,
               amountToPay: booking.amountToPay,
               startDate: format(booking.startDate, "LLL dd, y"),
               endDate: format(booking.endDate, "LLL dd, y"),
            });

            await resend.emails.send({
               from: "Oasis <booking@oasis-resort.xyz>",
               to: [booking.customer.user.email],
               subject: "(OASIS) Order Reminder",
               html: html,
            });
         } catch (error) {
            console.error("error disini");
         } finally {
            job.cancel();
         }
      });

      const updateDate = new Date(booking.endDate.setDate(booking.endDate.getDate() + 1));
      const updateJob = schedule.scheduleJob(updateDate, async () => {
         try {
            await prisma.booking.update({
               where: {
                  bookingNumber: booking?.bookingNumber,
               },
               data: {
                  paymentStatus: "COMPLETED",
               },
            });
         } catch (error) {
            console.error("error disini");
         } finally {
            updateJob.cancel();
         }
      });
   }
}
