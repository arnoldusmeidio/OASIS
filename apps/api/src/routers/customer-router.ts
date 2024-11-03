import { getPopularProperties, getSearchedPropertiesPagination } from "@/controllers/property/get-all-property";
import { getAllPropertiesCustomer } from "@/controllers/property/get-all-property-customer";
import { getSingleProperty } from "@/controllers/property/get-single-property";
import { getSingleRoom } from "@/controllers/room/get-single-room";
import { Router } from "express";

const router = Router();

router.route("/").get(getAllPropertiesCustomer);
router.route("/room").get(getSingleRoom);

router.route("/search").get(getSearchedPropertiesPagination);

router.route("/popular").get(getPopularProperties);

router.route("/:propertyId").get(getSingleProperty);

export default router;
