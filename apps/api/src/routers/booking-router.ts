import {
   getBookings,
   getBookingsByBookingNumber,
   deleteBookingByBookingNumber,
   createBooking,
} from "@/controllers/booking-controller";
import express from "express";

const router = express.Router();

router.route("/").get(getBookings);
router.route("/:bookingNumber").get(getBookingsByBookingNumber).delete(deleteBookingByBookingNumber);
router.route("/:roomId").post(createBooking);

export default router;
