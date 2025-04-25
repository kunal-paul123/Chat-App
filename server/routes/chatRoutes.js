import express from "express";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
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
router.route("/message/:id").get(isAuthenticated, getMessages);

// Get Chat Details, rename, delete

router
  .route("/:id")
  .get(isAuthenticated, getChatDetails)
  .put(isAuthenticated, renameGroup)
  .delete(isAuthenticated, deleteChat);

export default router;
