const router = require("express").Router();

const {
  userRegister,
  userLogin,
  userAuth,
  userPasswordChange,
  user,
  userFollowers,
  userCoverImageUpdate,
  userProfileEdit,
} = require("../controller/user.controller");

router.route("/register").post( userRegister);
router.route("/login").post(userLogin);
router.route("/authentication").get(userAuth);
router.route("/forgotpassword").patch(userPasswordChange);
router.route("/singleuser/:id").get(user);
router.route("/userfollowers").get(userFollowers);
router.route("/coverimageupdate").patch(userCoverImageUpdate);
router.route("/userprofileedit").patch(userProfileEdit);

module.exports = router;
