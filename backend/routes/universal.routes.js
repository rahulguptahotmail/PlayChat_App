const router = require("express").Router();
const { supportHandler } = require("../controller/universal.controller");

router.route("/support").post(supportHandler);

module.exports = router;
