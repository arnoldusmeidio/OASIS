import { createProperty } from "@/controllers/property/create-property-controller";
import { getAllPropertiesPagination } from "@/controllers/property/getAll-property";
import { editProperty } from "@/controllers/property/edit-property";
import { uploader } from "@/middlewares/uplouder-middleware";
import { Router } from "express";
import { deleteProperty } from "@/controllers/property/delete-property";
import { getSingleProperty } from "@/controllers/property/getSingle-property";

const router = Router();
const upload = uploader();

router.route("/").get(getAllPropertiesPagination).post(upload.single("pictureUrl"), createProperty);

router
   .route("/:propertyId")
   .get(getSingleProperty)
   .delete(deleteProperty)
   .put(upload.single("pictureUrl"), editProperty);

export default router;
