const express = require("express");
const { authenticateJWT } = require("../middleware/authenticator");
const upload = require("../middleware/multer");
const router = express.Router();
const productController = require("../controllers/productController");

router.post(
  "/",
  authenticateJWT,
  upload.single("productImage"),
  productController.create
);

module.exports = router;
