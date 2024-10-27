import { redeemRefCode } from "@/controllers/wallet-controller";
import express from "express";

const router = express.Router();

router.route("/").post(redeemRefCode);

export default router;
