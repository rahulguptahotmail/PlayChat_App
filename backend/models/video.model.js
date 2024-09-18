const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoPath: {
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

const videoModel = mongoose.model("videos", videoSchema);

module.exports = videoModel;
