import { getBookingsTenant } from "@/controllers/order-controller";
import express from "express";

const router = express.Router();

router.route("/").get(getBookingsTenant);

export default router;
