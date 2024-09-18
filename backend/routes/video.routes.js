const router = require("express").Router();
const {
  videoUpload,
  profileVideo,
  profileVideoDelete,
  videoLike,
  videoComment,
  homeVideos,
  singleVideo,
  singleUserProfile
  ,searchQuery
} = require("../controller/video.controller");

router.route("/upload").post( videoUpload);

router.route("/delete/:videoId").delete(profileVideoDelete);
router.route("/profile/:id").get(profileVideo);
router.route("/videolike").post(videoLike);
router.route("/videocomment").post(videoComment);
router.route("/videos").get(homeVideos);
router.route("/singlevideo/:id").get(singleVideo);
router.route("/singleuserprofile/:id").get(singleUserProfile);
router.route("/search").get(searchQuery)

module.exports = router;
