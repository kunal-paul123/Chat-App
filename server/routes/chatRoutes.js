import express from "express";
import { getMyChats, getMyGroups, newGroupChat } from "../controllers/chatController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/new").post(isAuthenticated, newGroupChat);

router.route("/my").get(isAuthenticated, getMyChats);

router.route("/my/groups").get(isAuthenticated, getMyGroups);

export default router;
