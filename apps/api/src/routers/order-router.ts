import {
   approveManualTransferPayment,
   getBookingPictureUrlByBookingNumber,
   getBookingsTenant,
} from "@/controllers/order-controller";
import express from "express";

const router = express.Router();

router.route("/").get(getBookingsTenant);
router.route("/:bookingNumber").get(getBookingPictureUrlByBookingNumber).put(approveManualTransferPayment);

export default router;
