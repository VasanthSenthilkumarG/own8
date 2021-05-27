var  express = require("express");
var  userController = require("../../controllers/userController");
var  router = express.Router();

// send otp
router.post("/sendotp", userController.SENDOTP);

// verify otp
router.post("/verifyotp", userController.VERIFYOTP);

module.exports = router;