import express from "express";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  sendAttachments,
} from "../controllers/chatController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";
const router = express.Router();

router.route("/new").post(isAuthenticated, newGroupChat);

router.route("/my").get(isAuthenticated, getMyChats);

router.route("/my/groups").get(isAuthenticated, getMyGroups);

router.route("/addmembers").put(isAuthenticated, addMembers);

router.route("/removemember").put(isAuthenticated, removeMember);

router.route("/leave/:id").delete(isAuthenticated, leaveGroup);

// Send Attachments
router
  .route("/message")
  .post(isAuthenticated, attachmentsMulter, sendAttachments);

// Get Messages

// Get Chat Details, rename, delete

// router.route("/:id").get().put().delete();

export default router;
