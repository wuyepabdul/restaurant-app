const express = require("express");
const categoryController = require("../controllers/categoryController");
const { authenticateJWT } = require("../middleware/authenticator");

const router = express.Router();

router.post("/category", authenticateJWT, categoryController.create);

module.exports = router;
