import jwt from "jsonwebtoken";
import { ErrorHandler } from "./utility.js";
import { TryCatch } from "./error.js";
import { User } from "../models/userModel.js";

const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["token"];

  if (!token)
    return next(new ErrorHandler("Please Login to access this resource", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
});

const socketAuhenticater = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authToken = socket.request.cookies["token"];

    if (!authToken) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user) {
      return next(
        new ErrorHandler("Please Login to access this resource", 404)
      );
    }

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
};

export { isAuthenticated, socketAuhenticater };
