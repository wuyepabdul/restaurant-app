const Category = require("../models/CategoryModel");

exports.create = async (req, res) => {
  const { category } = req.body;
  const categoryExist = await Category.findOne({ category });
  if (categoryExist) {
    res.status(400).json({ errorMessage: "Category Already Exists" });
  }
  try {
    let newCategory = new Category();
    newCategory.category = category;
    newCategory = await newCategory.save();

    res.status(200).json({
      category: newCategory,
      successMessage: `${newCategory.category} was created`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMessage: "Please try again" });
  }
};

exports.readAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ categories });
  } catch (error) {
    console.log("error in readAll categories", error.message);
    res.status(500).json({ errorMessage: "Please try again" });
  }
};
