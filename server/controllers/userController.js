import { compare } from "bcrypt";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../middlewares/utility.js";
import { Chat } from "../models/chatModel.js";
import { Request } from "../models/requestModel.js";
import { emitEvent } from "../utils/features.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";

//create a new user
const newUser = TryCatch(async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "sample_id",
    url: "sample_url",
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User created successfully");
});

//login user
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

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

//search user
const searchUser = TryCatch(async (req, res, next) => {
  const { name = "" } = req.query;

  //finding all my chats
  const myChats = await Chat.find({ groupChat: false, members: req.user });

  //extracting all users from my chats means friends or people I have chatted with
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  //finding all users except me and my friends
  const allUsersExceptMeAndFriends = await User.find({
    _id: {
      $nin: allUsersFromMyChats,
    },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users,
  });
});

//send request
const sendFriendRequest = TryCatch(async (req, res) => {
  const { userId } = req.body;

  if (!userId) return next(new ErrorHandler("Please Enter User ID", 400));

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) return next(new ErrorHandler("Request already sent", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  res.status(200).json({
    success: true,
    message: "Friend Request Sent",
  });
});

//accept requset
const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) return next(new ErrorHandler("Request Not Found", 404));

  if (request.receiver.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not Unauthorized to accept this request", 401)
    );

  if (!accept) {
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      messgae: "Friend Request Rejected",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  res.status(200).json({
    success: true,
    message: "Friend Request Accepted",
    senderId: request.sender._id,
  });
});

export {
  newUser,
  login,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
};
