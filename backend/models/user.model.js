const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
  },
  image: {
    type: String, // cloudinary url
    required: true,
  },
  coverImage: {
    type: String, // cloudinary url
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  registered: {
    type: Boolean,
    default: false,
    required: true,
  },
  createAccountAt: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
