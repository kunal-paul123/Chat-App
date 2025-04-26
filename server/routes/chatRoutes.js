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
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameGroupValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";
const router = express.Router();

router
  .route("/new")
  .post(isAuthenticated, newGroupValidator(), validateHandler, newGroupChat);

router.route("/my").get(isAuthenticated, getMyChats);

router.route("/my/groups").get(isAuthenticated, getMyGroups);

router
  .route("/addmembers")
  .put(isAuthenticated, addMemberValidator(), validateHandler, addMembers);

router
  .route("/removemember")
  .put(isAuthenticated, removeMemberValidator(), validateHandler, removeMember);

router
  .route("/leave/:id")
  .delete(isAuthenticated, chatIdValidator(), validateHandler, leaveGroup);

// Send Attachments
router
  .route("/message")
  .post(
    isAuthenticated,
    attachmentsMulter,
    sendAttachmentsValidator(),
    validateHandler,
    sendAttachments
  );

// Get Messages
router
  .route("/message/:id")
  .get(isAuthenticated, chatIdValidator(), validateHandler, getMessages);

// Get Chat Details, rename, delete

router
  .route("/:id")
  .get(isAuthenticated, chatIdValidator(), validateHandler, getChatDetails)
  .put(isAuthenticated, renameGroupValidator(), validateHandler, renameGroup)
  .delete(isAuthenticated, chatIdValidator(), validateHandler, deleteChat);

export default router;
