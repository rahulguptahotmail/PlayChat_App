const videoModel = require("../models/video.model");
const userModel = require("../models/user.model");
const uploadOnCloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const videoUpload = async (req, res) => {
  let { videoPath, title, description, tags, token } = req.body;

  // how to get owner id
  const userId = jwt.verify(token, process.env.JWT_SECRET).id;

  if (!token || !userId)
    return res
      .status(400)
      .json({ message: "Image not uploaded", success: false });

  if (!title) title = Date.now().toString();

  // if video not found then return res false
  if (!videoPath)
    return res.status(404).json({ message: "Video not found", success: false });

  // if video found then upload cloudinary

  // const cloudinaryRes = await uploadOnCloudinary(videoPath);

  // const cloudinaryPath = cloudinaryRes?.url;

  // if (!cloudinaryPath)
  //   return res
  //     .status(500)
  //     .json({ messaage: "Error while Uploadin Video", success: false });

  const video = await videoModel.create({
    videoPath,
    title,
    description,
    tags,
    owner: userId,
  });

  video.save();

  return res.status(201).json({ message: "Video Uploaded!", success: true });
};

// profile Video Serve

const profileVideo = async (req, res) => {
  const token = req.params.id;

  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !id)
    return res.status(400).json({ message: "Invalid token!", success: false });

  const videos = await videoModel.find({ owner: id });
  videos.reverse();
  return res.status(200).json({ message: "success", videos, success: true });
};

// Delete Profile Video

const profileVideoDelete = async (req, res) => {
  const videoId = req.params.videoId;

  if (!videoId)
    return res
      .status(404)
      .json({ message: "invalid video Id", success: false });

  await videoModel.findByIdAndDelete(videoId);

  return res.status(200).json({ message: "Delete Success", success: true });
};

// Video Like Handler

const videoLike = async (req, res) => {
  const { token, videoId } = req.body;

  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !id)
    return res.status(400).json({ message: "Invalid token!", success: false });

  const user = await userModel.findById(id);
  const video = await videoModel.findById(videoId);
  let index;
  const value = video.likedBy.some((x, idx) => {
    if (JSON.stringify(x?.userId) === JSON.stringify(user._id)) {
      index = idx;
      return true;
    }
  });

  if (value) {
    video.likedBy.splice(index, 1);
    video.save();
    return res.status(200).json({ message: "Success!", success: true });
  } else {
    await videoModel.findByIdAndUpdate(videoId, {
      $push: {
        likedBy: {
          fullName: user.fullName,
          userName: user.userName,
          image: user.image,
          userId: id,
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Video Like Success", success: true });
  }
};

// video comment handler

const videoComment = async (req, res) => {
  const { token, videoId, comment } = req.body;

  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !id)
    return res.status(400).json({ message: "Invalid token!", success: false });

  const user = await userModel.findById(id);
  if (!user)
    return res.status(404).json({ message: "Invalid user!", success: false });

  await videoModel.findByIdAndUpdate(videoId, {
    $push: {
      commentBy: {
        comment,
        fullName: user.fullName,
        userName: user.userName,
        image: user.image,
        userId: id,
      },
    },
  });
  return res.status(200).json({ message: "Video Like Success", success: true });
};

// singleVideo Serve

const singleVideo = async (req, res) => {
  let videoId = req.params.id;
  if (!mongoose.isValidObjectId(videoId))
    return res
      .status(404)
      .json({ message: "Invalid video id", success: false });

  const video = await videoModel.findById(videoId);

  if (!video)
    return res.status(404).json({ message: "Video Not Found", success: false });

  const user = await userModel.findById(video.owner);

  return res
    .status(200)
    .json({ message: "Success", videoDetails: { video, user }, success: true });
};

// single user profile video serve

const singleUserProfile = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.isValidObjectId(userId))
    return res.status(404).json({ message: "Invalid user id", success: false });

  const videos = await videoModel.find({ owner: userId });
  videos.reverse();
  return res.status(200).json({ message: "success", videos, success: true });
};

//  search query

const searchQuery = async (req, res) => {
  const searchQueryString = req.query?.searchQuery;

  // ^ for start in first character not middle
  const VideoString = "^" + searchQueryString;
  let UserString = searchQueryString.includes("@")
    ? searchQueryString
    : "@" + searchQueryString;

  // i for case insensitive
  const videos = await videoModel
    .find({
      title: { $regex: VideoString, $options: "i" },
    })
    .limit(5);

  // find User

  const user = await userModel.findOne({ userName: UserString });

  res
    .status(200)
    .json({ message: "Success", result: { videos, user }, success: true });
};

// Home Videos with Algorithms

const homeVideos = async (req, res) => {
  const videos = await videoModel.find();
  videos.reverse();
  return res.status(200).json({ message: "Videos", videos, success: true });
};

module.exports = {
  videoUpload,
  profileVideo,
  profileVideoDelete,
  videoLike,
  videoComment,
  homeVideos,
  singleVideo,
  singleUserProfile,
  searchQuery,
};
