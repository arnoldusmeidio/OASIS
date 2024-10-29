import { createRoom } from "@/controllers/room/create-room";
// import { deleteRoom } from "@/controllers/room/delete-room";
// import { editRoom } from "@/controllers/room/edit-room";
import { getSingleRoom } from "@/controllers/room/get-single-room";
import { uploader } from "@/middlewares/uplouder-middleware";
import { Router } from "express";

const router = Router();
const upload = uploader();

router.route("/:propertyId").post(upload.array("roomPictures", 5), createRoom);

router.route("/:roomId").post(upload.array("roomPictures", 5)).get(getSingleRoom);

export default router;

// .delete(deleteRoom)
