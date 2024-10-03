import { getSampleData, getSampleDataById, createSampleData } from "@/controllers/sample.controller";
import { Router } from "express";

const router = Router();

// Define routes
router.route("/").get(getSampleData).post(createSampleData);
router.route("/:id").get(getSampleDataById);

export default router;
