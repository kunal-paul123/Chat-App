import jwt from "jsonwebtoken";
import { ErrorHandler } from "./utility.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies["token"];

  if (!token)
    return next(new ErrorHandler("Please Login to access this resource", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
};

export { isAuthenticated };
