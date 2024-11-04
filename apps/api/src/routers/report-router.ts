import { getMonthlySalesReport, getSalesReport } from "@/controllers/report/report-controller";
import { Router } from "express";

const router = Router();

router.route("/").get(getSalesReport);
router.route("/monthlyReport").get(getMonthlySalesReport);

export default router;
