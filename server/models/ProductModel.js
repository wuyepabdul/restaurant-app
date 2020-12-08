const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    productName: { type: String, trim: true, required: true, maxlength: 60 },
    productDescription: { type: String, trim: true },
    productPrice: { type: Number, required: true },
    productCategory: { type: ObjectId, ref: "Category", required: true },
    productQuantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
