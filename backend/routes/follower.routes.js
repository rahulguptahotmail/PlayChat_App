const router = require("express").Router();
const {
  followerHandler,
  isFollowed,
  getFollowers,
  getUserFollowers,
} = require("../controller/follower.controller");

router.route("/followers").post(followerHandler);
router.route("/isfollow/:user").get(isFollowed);
router.route("/getuserfollowers").get(getUserFollowers);
router.route("/getfollowers").get(getFollowers);

module.exports = router;
