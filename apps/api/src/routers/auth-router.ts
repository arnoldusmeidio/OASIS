import express from "express";
import {
   emailVerification,
   googleLogin,
   googleLoginCallback,
   login,
   logout,
   register,
} from "@/controllers/auth-controller";

const router = express.Router();

router.route("/register").post(register);
router.route("/email-verification").post(emailVerification);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/google").get(googleLogin);
router.route("/google/callback").get(googleLoginCallback);

export default router;
