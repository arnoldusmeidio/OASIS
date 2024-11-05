import { createBooking, getBookingsByBookingNumber } from "@/controllers/booking-controller";

import { createRoom } from "@/controllers/room/create-room";
import { editRoom } from "@/controllers/room/edit-room";
import { getTenantRoomStatus } from "@/controllers/room/get-room-status-tenant";
import { deleteRoom } from "@/controllers/room/delete-room";
import { getSingleRoom } from "@/controllers/room/get-single-room";
import { uploader } from "@/middlewares/uplouder-middleware";
import { Router } from "express";

const router = Router();
const upload = uploader();

router.route("/:propertyId").post(upload.array("roomPictures", 5), createRoom);

router.route("/:roomId").get(getSingleRoom).put(upload.array("roomPictures", 5), editRoom).delete(deleteRoom);

router.route("/:roomId/status").get(getTenantRoomStatus);

export default router;

// .delete(deleteRoom)
