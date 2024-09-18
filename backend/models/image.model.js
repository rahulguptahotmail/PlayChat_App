const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  description: { type: String },
  tags: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likedBy: [
    {
      fullName: String,
      userName: String,
      image: String,
      userId: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  commentBy: [
    {
      comment: String,
      fullName: String,
      userName: String,
      image: String,
      userId: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});

const imageModel = mongoose.model("images", imageSchema);

module.exports = imageModel;
