const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
