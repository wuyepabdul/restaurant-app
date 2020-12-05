const Category = require("../models/CategoryModel");

exports.create = async (req, res) => {
  const { category } = req.body;

  try {
    let newCategory = new Category();
    newCategory.category = category;
    newCategory = await newCategory.save();

    res
      .status(200)
      .json({ successMessage: `${newCategory.category} was created` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMessage: "Please try again" });
  }
};
