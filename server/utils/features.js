const emitEvent = (req, event, users, data) => {
  console.log("Emiting event", event);
};

const deleteFilesFromCloudinary = async (public_ids) => {
  console.log("Deleting files from cloudinary", public_ids);
};

export { emitEvent, deleteFilesFromCloudinary };
