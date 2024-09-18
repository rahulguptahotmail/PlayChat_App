const imageModel = require("../models/image.model");
const userModel = require("../models/user.model");
const mongoose = require("mongoose");
const uploadOnCloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");

const imageUpload = async (req, res) => {
  let { imagePath, title, description, tags, token } = req.body;

  // how to get owner id
  const userId = jwt.verify(token, process.env.JWT_SECRET).id;

  if (!token || !userId)
    return res
      .status(400)
      .json({ message: "Image not uploaded", success: false });

  if (!title) title = Date.now().toString();

  // if image not found then return res false
  if (!imagePath)
    return res.status(404).json({ message: "Image not found", success: false });

  // // if image found then upload cloudinary
  // let cloudinaryPath;
  // await uploadOnCloudinary(imagePath).then(
  //   (res) => (cloudinaryPath = res?.url)
  // );

  // if (!cloudinaryPath)
  //   return res
  //     .status(500)
  //     .json({ messaage: "Error while Uploadin Image", success: false });

  const image = await imageModel.create({
    imagePath,
    title,
    description,
    tags,
    owner: userId,
  });

  image.save();

  return res.status(201).json({ message: "Image Uploaded!", success: true });
};

// profile Image Serve

const profileImage = async (req, res) => {
  const token = req.params.id;

  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !id)
    return res.status(400).json({ message: "Invalid token!", success: false });

  const images = await imageModel.find({ owner: id });
  images.reverse();
  res.status(200).json({ message: "success", images, success: true });
};

// Delete Profile Video

const profileImageDelete = async (req, res) => {
  const imageId = req.params.imageId;

  if (!imageId)
    return res
      .status(404)
      .json({ message: "invalid image Id", success: false });

  await imageModel.findByIdAndDelete(imageId);

  return res.status(200).json({ message: "Delete Success", success: true });
};

// Image Like Handler

const imageLike = async (req, res) => {
  const { token, imageId } = req.body;

  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !id)
    return res.status(400).json({ message: "Invalid token!", success: false });

  const user = await userModel.findById(id);
  const image = await imageModel.findById(imageId);
  let index;
  const value = image?.likedBy.some((x, idx) => {
    if (JSON.stringify(x?.userId) === JSON.stringify(user._id)) {
      index = idx;
      return true;
    }
  });
  if (value) {
    image.likedBy.splice(index, 1);
    image.save();
    return res.status(200).json({ message: "Success!", success: true });
  } else {
    await imageModel.findByIdAndUpdate(imageId, {
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

// image comment FileSystemHandler

const imageComment = async (req, res) => {
  const { token, imageId, comment } = req.body;

  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!token || !id)
    return res.status(400).json({ message: "Invalid token!", success: false });

  const user = await userModel.findById(id);
  if (!user)
    return res.status(404).json({ message: "Invalid user", success: false });

  await imageModel.findByIdAndUpdate(imageId, {
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

// fetch single image

const fetchSingleImage = async (req, res) => {
  const imageId = req.query.imageId;

  if (!mongoose.isValidObjectId(imageId))
    return res
      .status(404)
      .json({ message: "Invalid image id", success: false });

  const image = await imageModel.findById(imageId);

  if (!image)
    return res.status(404).json({ message: "Image Not Found", success: false });

  const user = await userModel.findById(image.owner);

  return res
    .status(200)
    .json({
      message: "Image Success",
      imageDetails: { image, user },
      success: true,
    });
};

// Home Videos with Algorithms

const homeImages = async (req, res) => {
  const length = req.query.length;
  const image = await imageModel.find();
  image.reverse();
  const images = image.splice(0, length + 10);

  return res.status(200).json({ message: "Images", images, success: true });
};

// single user image serve

const singleUserProfile = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.isValidObjectId(userId))
    return res.status(404).json({ message: "Invalid user id", success: false });

  const images = await imageModel.find({ owner: userId });
  images.reverse();
  return res.status(200).json({ message: "success", images, success: true });
};

module.exports = {
  imageUpload,
  profileImage,
  profileImageDelete,
  imageLike,
  imageComment,
  homeImages,
  fetchSingleImage,
  singleUserProfile,
};
