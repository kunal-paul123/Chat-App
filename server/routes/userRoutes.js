import express from "express";
const router = express.Router();
import {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  loginValidator,
  registerValidator,
  validateHandler,
} from "../lib/validators.js";

router
  .route("/new")
  .post(singleAvatar, registerValidator(), validateHandler, newUser);
router.route("/login").post(loginValidator(), validateHandler, login);
router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/search").get(isAuthenticated, searchUser);

router.route("/sendrequest").put(isAuthenticated, sendFriendRequest);

router.route("/acceptrequest").put(isAuthenticated, sendFriendRequest);

export default router;
