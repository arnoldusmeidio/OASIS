import { Router } from "express";

import { getRoomStatus } from "../controllers/date-room-controller";
import { getAllPropertyBeta } from "@/controllers/sample-controller";

const router = Router();

router.route("/").get(getAllPropertyBeta);
router.route("/:id/status").get(getRoomStatus);

export default router;
