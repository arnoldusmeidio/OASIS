// import { Request, Response } from "express";
// import prisma from "@/prisma";
// import { MidtransClient } from "midtrans-node-client";
// import { v4 as uuid } from "uuid";
// import { updateOrderStatus } from "../helpers/update-order-status";
// import { RequestWithUserId } from "@/types";

// export async function createPayment(req: RequestWithUserId, res: Response) {
//    const id = (req as RequestWithUserId).user?.id;
//    try {
//       const user = await prisma.user.findUnique({
//          where: { id, customer: { id } },
//       });

//       if (!user) return res.status(400).json({ message: "Failed to aunthenticate user", ok: false });

//       const { bookingNumber } = req.params;

//       const booking = await prisma.booking.findUnique({
//          where: { bookingNumber, customerId: user.id, paymentStatus: "PENDING" },
//       });

//       if (!booking) {
//          return res.send(404).json({ message: "No bookings found", ok: false });
//       }
//       const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
//       const firstDate = new Date(booking.startDate);
//       const secondDate = new Date(booking.endDate);

//       const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

//       const amount = item.price * Number(quantity);
//       const orderId = uuid();
//       const parameter = {
//          transaction_details: {
//             order_id: orderId,
//             gross_amount: amount,
//          },
//          item_details: [{ id: itemId, name: item.name, price: item.price, quantity }],
//          customer_details: {
//             first_name: "John",
//             last_name: "Doe",
//             email: "john.doe@purwadhika.com",
//          },
//          callbacks: {
//             finish: "http://localhost:3000",
//          },
//       };
//       const transaction = await snap.createTransaction(parameter);
//       const order = await prisma.order.create({
//          data: { id: orderId, amount, quantity, itemId },
//       });

//       return res.status(201).json({ ok: true, data: { order, transaction } });
//    } catch (error) {
//       console.error(error);
//       return res.status(500);
//    }
// }
