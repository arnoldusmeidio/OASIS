import { createRoom } from "@/controllers/room/create-room";
import { uploader } from "@/middlewares/uplouder-middleware";
import { Router } from "express";

const router = Router();
const upload = uploader();

router.route("/:propertyid").post(upload.single("pictureUrl"), createRoom);

export default router;
