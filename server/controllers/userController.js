import { compare } from "bcrypt";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../middlewares/utility.js";

//create a new user
const newUser = async (req, res) => {
  const { name, userName, password, bio } = req.body;

  const avatar = {
    public_id: "sample_id",
    url: "sample_url",
  };

  const user = await User.create({
    name,
    bio,
    userName,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created successfully");
};

//login user
const login = TryCatch(async (req, res, next) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 201, `Welcome Back, ${user.name}`);
});

//get user
const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user,
  });
});

//logout
const logout = TryCatch(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export { newUser, login, getMyProfile, logout };
