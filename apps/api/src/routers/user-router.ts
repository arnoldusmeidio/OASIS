import express from "express";
import { getSingleUser, selectUserRole } from "@/controllers/user-controller";

const router = express.Router();

router.route("/search").get(getSingleUser);
router.route("/role").put(selectUserRole);

export default router;
