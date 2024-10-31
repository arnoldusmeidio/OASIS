import { Router } from "express";
import { createPayment } from "../controllers/payment-controller";

const router = Router();

router.route("/:bookingNumber").post(createPayment);

export default router;
