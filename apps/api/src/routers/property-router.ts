import { createProperty, getSingleProperty } from "@/controllers/property-controller";
import { uploader } from "@/middlewares/uplouder-middleware";
import { Router } from "express";

const router = Router();
const upload = uploader();

router.route("/").get(getSingleProperty);

router.route("/create").post(upload.single("pictureUrl"), createProperty);

export default router;
