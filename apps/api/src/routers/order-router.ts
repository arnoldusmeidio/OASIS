import {
   approveManualTransferPayment,
   deleteBookingByBookingNumberTenant,
   getBookingPictureUrlByBookingNumber,
   getBookingsTenant,
} from "@/controllers/order-controller";
import express from "express";

const router = express.Router();

router.route("/").get(getBookingsTenant);
router.route("/:bookingNumber").get(getBookingPictureUrlByBookingNumber).delete(deleteBookingByBookingNumberTenant);
router.route("/:bookingNumber/:code").post(approveManualTransferPayment);
export default router;
