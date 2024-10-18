import express from "express";
import {
   googleLogin,
   googleLoginCallback,
   login,
   logout,
   register,
   updateUserPassword,
} from "@/controllers/auth-controller";
import { emailUpdateVerification, emailVerification, passwordResetEmail } from "@/controllers/email-controller";
import { verifyToken } from "@/middlewares/auth-middleware";
import { updateUserEmail } from "@/controllers/user-controller";

const router = express.Router();

router.route("/register").post(register);
router.route("/user/email").post(verifyToken, emailUpdateVerification).put(verifyToken, updateUserEmail);
router.route("/user/password").post(passwordResetEmail).put(updateUserPassword);
router.route("/email-verification").post(emailVerification);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/google").get(googleLogin);
router.route("/google/callback").get(googleLoginCallback);

export default router;
