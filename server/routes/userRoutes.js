import express from "express";
const router = express.Router();
import {
  acceptFriendRequest,
  getMyFriends,
  getMyProfile,
  getNotifications,
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

router.route("/acceptrequest").put(isAuthenticated, acceptFriendRequest);

router.route("/notifications").get(isAuthenticated, getNotifications);

router.route("/friends").get(isAuthenticated, getMyFriends);
export default router;
