const followerModel = require("../models/followers.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const userModel = require("../models/user.model");

// followers handler function

const followerHandler = async (req, res) => {
  const { token, ownerId } = req.body;

  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !id)
    return res.status(400).json({ message: "Invalid token!", success: false });

  const followers = await followerModel.find({ followedBy: id });
  let ObId;
  const value = followers.some((x, idx) => {
    if (JSON.stringify(x?.followedAccount) === JSON.stringify(ownerId)) {
      ObId = x._id;
      return true;
    }
  });

  if (value) {
    await followerModel.findByIdAndDelete(ObId);
    return res.status(200).json({ message: "Delete Success!", success: true });
  } else {
    const newFollower = await followerModel.create({
      followedBy: id,
      followedAccount: ownerId,
    });
    await newFollower.save();
    return res.status(200).json({ message: "followed Success", success: true });
  }
};

// isFollowed handler function

const isFollowed = async (req, res) => {
  const ownerId = req.params.user;
  const token = req.query.token;

  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !id)
    return res.status(400).json({ message: "Invalid token!", success: false });

  const followers = await followerModel.find({ followedBy: id });
  const value = followers.some(
    (x) => JSON.stringify(x?.followedAccount) === JSON.stringify(ownerId)
  );
  res.status(200).json({ message: "success", value, success: true });
};

// get profile followers

const getFollowers = async (req, res) => {
  const token = req.query.token;

  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !userId)
    return res.status(400).json({ message: "Invalid token!", success: false });

  // if(!mongoose.isValidObjectId(userId)) return res.status(400).json({ message: "Invalid user id", success: false });

  const followed = await followerModel.find({ followedBy: userId });
  const followers = await followerModel.find({ followedAccount: userId });

  return res.status(200).json({
    message: "Analysis Success",
    Follow: { followed, followers },
    success: true,
  });
};

// get user followers handler
const getUserFollowers = async (req, res) => {
  const userId = req.query.userId;

  // const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  // if (!token || !userId)
  //   return res.status(400).json({ message: "Invalid token!", success: false });

  if (!mongoose.isValidObjectId(userId))
    return res.status(400).json({ message: "Invalid user id", success: false });

  const followed = await followerModel.find({ followedBy: userId });
  const followers = await followerModel.find({ followedAccount: userId });

  return res.status(200).json({
    message: "Analysis Success",
    Follow: { followed, followers },
    success: true,
  });
};

module.exports = {
  followerHandler,
  isFollowed,
  getUserFollowers,
  getFollowers,
};
