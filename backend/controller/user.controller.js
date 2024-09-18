const userModel = require("../models/user.model");
const videoModel = require("../models/video.model");
const uploadOnCloudinary = require("../utils/cloudinary");
const otpGenerate = require("../utils/otpGenerator");
const sendingMail = require("../utils/nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const followerModel = require("../models/followers.model");

// LoginHandler
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password))
    return res
      .status(401)
      .json({ message: "Enter Email And Password", success: false });

  const user = await userModel.findOne({
    $or: [{ email }, { userName: "@" + email }],
  });

  if (!user)
    return res
      .status(401)
      .json({ message: "username or Email is Not Registered", success: false });

  const flag = await bcrypt.compareSync(password, user.password);

  if (flag) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "Login Successfully", token, success: true });
  } else {
    return res
      .status(401)
      .json({ message: "Invalid Password", success: false });
  }
};

// RegisterHandler
const userRegister = async (req, res) => {
  const { fullName, email, password, Otp, image } = req.body;

  // if otp coming from the user

  if (Otp) {
    const user = await userModel.findOne({ email });
    if (user && user?.otp === Otp) {
      await userModel.findByIdAndUpdate(user?._id, {
        $set: { registered: true },
      });

      const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);
      return res
        .status(200)
        .json({ message: "Registration successful", token, success: true });
    } else {
      return res.status(400).json({
        message: "Wrong Otp Refresh Page and try again!",
        success: false,
      });
    }

    // else otp request from the user
  } else {
    // check user Already exists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      if (!exists.registered) await userModel.findByIdAndDelete(exists._id);
      else
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
    }

    const otp = otpGenerate();
    const userName = "@" + email.split("@")[0];

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

    const coverImage =
      "https://as2.ftcdn.net/v2/jpg/07/80/74/55/1000_F_780745531_nVfSqNdh1pUwMW1e2qqXtsJLbLAUozmm.jpg";
    // let image =
    //   "https://as1.ftcdn.net/v2/jpg/06/07/41/96/1000_F_607419630_4VxkvMK8OqUPI713ljUJmIhtwCl0W0EV.webp";

    // req.file
    //   ? await uploadOnCloudinary(image).then((res) => (image = res.url))
    //   : (image =
    //       "https://as1.ftcdn.net/v2/jpg/06/07/41/96/1000_F_607419630_4VxkvMK8OqUPI713ljUJmIhtwCl0W0EV.webp");

    // create user and save
    const user = await userModel.create({
      userName,
      fullName,
      email,
      password: hashedPassword,
      image,
      coverImage,
      otp,
    });
    await user.save();

    // user otp request
    sendingMail(email, otp);

    // check user true of false in 60 sec
    setTimeout(async () => {
      const user = await userModel.findOne({ email });
      if (!user?.registered) await userModel.findByIdAndDelete(user?._id);
    }, 60000);

    return res.status(201).json({ message: "success", success: true });
  }
};

// auth handler

const userAuth = async (req, res) => {
  token = req.query.token;

  if (!token)
    return res
      .status(403)
      .json({ message: "Not Availabel token", success: false });

  const tokenData = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({ _id: tokenData.id });

  if (!user || !user.registered)
    return res
      .status(403)
      .json({ message: "User Not Registered", success: false });

  res.status(200).json({
    message: "success",
    userDetails: {
      fullName: user.fullName,
      userName: user.userName,
      image: user.image,
      coverImage: user.coverImage,
      createdAt: user.createAccountAt,
    },
    success: true,
  });
};

// forget password Handler

const userPasswordChange = async (req, res) => {
  const { email, password, Otp } = req.body;

  // if OTP coming from the user

  if (Otp) {
    const user = await userModel.findOne({ email });
    if (user && user?.otp === Otp) {
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
      await userModel.findByIdAndUpdate(user?._id, {
        password: hashedPassword,
      });

      return res
        .status(200)
        .json({ message: "Forgot successfull", success: true });
    } else {
      return res.status(400).json({
        message: "Wrong Otp Refresh Page and try again!",
        success: false,
      });
    }
  } else {
    const otp = otpGenerate();

    // user otp request
    sendingMail(email, otp);

    // update otp in db
    const user = await userModel.findOneAndUpdate({ email }, { $set: { otp } });

    return res.status(200).json({ message: "OTP Sent success", success: true });
  }
};

// user by id

const user = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: "Invalid User ID", success: false });

  const user = await userModel.findById(id);
  res.status(200).json({ message: "User", user, success: true });
};

// user Followers Handler

const userFollowers = async (req, res) => {
  const token = req.query.token;

  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!userId | !token)
    return res.status(400).json({ message: "Invalid token", success: false });

  let followers = [];
  const user = await followerModel.find({ followedAccount: userId });

  user.forEach(async (x) => {
    const res = await userModel.findById(x.followedBy);
    followers.push(res);
  });
  setTimeout(() => {
    return res.status(200).json({ message: "User", followers, success: true });
  }, 2000);
};

// user Cover Image Handler

const userCoverImageUpdate = async (req, res) => {
  const { token, coverImage } = req.body;

  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!userId | !token)
    return res.status(400).json({ message: "Invalid token", success: false });

  // updating user cover image
  await userModel.findByIdAndUpdate(userId, { $set: { coverImage } });

  return res.status(200).json({ message: "success", success: true });
};

// user profile edit

const userProfileEdit = async (req, res) => {
  const { token, fullName, userName, image } = req.body;

  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  if (!userId | !token)
    return res.status(400).json({ message: "Invalid token", success: false });

  if (userName) {
    let newUserName = userName;
    if (!userName.includes("@")) newUserName = "@" + userName;
    if (await userModel.findOne({ userName: newUserName }))
      return res
        .status(400)
        .json({ message: "UserName already exists", success: false });
    await userModel.findByIdAndUpdate(userId, {
      $set: { userName: newUserName },
    });
  }

  if (image) await userModel.findByIdAndUpdate(userId, { $set: { image } });

  if (fullName)
    await userModel.findByIdAndUpdate(userId, { $set: { fullName } });

  return res.status(200).json({ message: "Updated success", success: true });
};

module.exports = {
  userRegister,
  userLogin,
  userAuth,
  userPasswordChange,
  user,
  userFollowers,
  userCoverImageUpdate,
  userProfileEdit,
};
