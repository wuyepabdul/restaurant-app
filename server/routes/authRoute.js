const express = require("express");
const {
  signupController,
  signinController,
} = require("../controllers/authControllers.js");

const {
  signinValidator,
  signupValidator,
  validatorResult,
} = require("../middleware/validator.js");

const router = express.Router();

router.post("/signup", signupValidator, validatorResult, signupController);
router.post("/signin", signinValidator, validatorResult, signinController);

module.exports = router;
