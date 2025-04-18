import express from "express";
const router = express.Router();
import { getMyProfile, login, logout, newUser } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.route("/new").post(singleAvatar, newUser);
router.route("/login").post(login);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/logout").get(logout);

export default router;
