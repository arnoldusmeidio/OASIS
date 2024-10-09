import express from "express";
import { createBooking } from "@/controllers/booking-controller";

const router = express.Router();

router.route("/:roomId").post(createBooking);

export default router;
