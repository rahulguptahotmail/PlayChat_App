const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
  followedBy: mongoose.Schema.Types.ObjectId,
  followedAccount: mongoose.Schema.Types.ObjectId,
});

const followerModel = mongoose.model("followers", followerSchema);

module.exports = followerModel;
