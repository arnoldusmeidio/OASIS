import {
   getBookings,
   getBookingsByBookingNumber,
   deleteBookingByBookingNumber,
} from "@/controllers/booking-controller";
import express from "express";

const router = express.Router();

router.route("/").get(getBookings);
router.route("/:bookingNumber").get(getBookingsByBookingNumber).delete(deleteBookingByBookingNumber);

export default router;
