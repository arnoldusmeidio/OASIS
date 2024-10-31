import express from "express";
import { getSingleUser, selectUserRole, updateUserInfo, updateUserPicture } from "@/controllers/user-controller";
import { uploader } from "@/middlewares/uplouder-middleware";

const router = express.Router();
const upload = uploader();

router.route("/").get(getSingleUser).put(updateUserInfo);
router.route("/picture").put(upload.single("pictureUrl"), updateUserPicture);
router.route("/role").put(selectUserRole);

export default router;
