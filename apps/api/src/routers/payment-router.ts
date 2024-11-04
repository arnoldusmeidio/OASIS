import { Router } from "express";
import { createPayment } from "../controllers/payment/midtrans-payment-controller";
import { confirmBookingTf, uploadPaymentProof } from "@/controllers/payment/manual-transfer-controller";
import { uploader } from "@/middlewares/uplouder-middleware";
import { createDigitalPayment } from "@/controllers/payment/digital-payment-controller";

const router = Router();
const upload = uploader();

router.route("/midtrans/:bookingNumber").post(createPayment);
router.route("/transfer/:bookingNumber").put(upload.single("pictureUrl"), uploadPaymentProof);
router.route("/digital/:bookingNumber").post(createDigitalPayment);
router.route("/confirm/:bookingNumber").post(confirmBookingTf);

export default router;
