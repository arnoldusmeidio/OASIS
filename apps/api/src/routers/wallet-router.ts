import { redeemRefCode, topUpWallet } from "@/controllers/wallet-controller";
import express from "express";

const router = express.Router();

router.route("/").post(redeemRefCode);
router.route("/:amount").post(topUpWallet);

export default router;
