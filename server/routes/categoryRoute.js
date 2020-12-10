const express = require("express");
const categoryController = require("../controllers/categoryController");
const { authenticateJWT } = require("../middleware/authenticator");

const router = express.Router();

router.post("/", authenticateJWT, categoryController.create);
router.get("/", authenticateJWT, categoryController.readAll);

module.exports = router;
