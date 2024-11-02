import { Router } from "express";
import { createPayment } from "../controllers/payment/midtrans-payment-controller";
import { uploadPaymentProof } from "@/controllers/payment/manual-transfer-controller";
import { uploader } from "@/middlewares/uplouder-middleware";

const router = Router();
const upload = uploader();

router.route("/midtrans/:bookingNumber").post(createPayment);
router.route("/transfer/:bookingNumber").post(upload.single("pictureUrl"), uploadPaymentProof);

export default router;
