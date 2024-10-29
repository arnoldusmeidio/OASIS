import { getAllPropertiesPagination, getSearchedPropertiesPagination } from "@/controllers/property/get-all-property";
import { getSingleProperty } from "@/controllers/property/get-single-property";
import { getSingleRoom } from "@/controllers/room/get-single-room";
import { Router } from "express";

const router = Router();

router.route("/").get(getAllPropertiesPagination).get(getSingleProperty);

router.route("/room").get(getSingleRoom);

router.route("/search").get(getSearchedPropertiesPagination);

router.route("/:propertyId").get(getSingleProperty);

export default router;
