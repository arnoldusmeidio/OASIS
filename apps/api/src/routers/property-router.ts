import { createProperty } from "@/controllers/property/create-property-controller";
import { getAllPropertiesPagination } from "@/controllers/property/getAll-property";
import { editProperty } from "@/controllers/property/edit-property";
import { uploader } from "@/middlewares/uplouder-middleware";
import { Router } from "express";
import { deleteProperty } from "@/controllers/property/delete-property";

const router = Router();
const upload = uploader();

router.route("/").get(getAllPropertiesPagination);

router.route("/create").post(upload.single("pictureUrl"), createProperty);

router.route("/delete/:id").delete(deleteProperty);

router.route("/:propertyId/edit").put(upload.single("pictureUrl"), editProperty);

export default router;
