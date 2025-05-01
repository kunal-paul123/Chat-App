import multer from "multer";

const storage = multer.memoryStorage({});

const Upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const singleAvatar = Upload.single("avatar");

const attachmentsMulter = Upload.array("files", 5);

export { singleAvatar, attachmentsMulter };
