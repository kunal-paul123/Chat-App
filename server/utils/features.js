import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64 } from "../lib/helper.js";

const emitEvent = (req, event, users, data) => {
  console.log("Emiting event", event);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    return formattedResults;
  } catch (error) {
    console.log("Error uploading files to cloudinary", error);
  }
};

const deleteFilesFromCloudinary = async (public_ids) => {
  console.log("Deleting files from cloudinary", public_ids);
};

export { emitEvent, deleteFilesFromCloudinary, uploadFilesToCloudinary };
