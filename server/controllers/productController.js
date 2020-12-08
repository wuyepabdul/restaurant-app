const Product = require("../models/ProductModel");

exports.create = async (req, res) => {
  console.log("req.user: ", req.user);
  console.log("req.file: ", req.file);
  console.log("req.body: ", req.body);

  const { filename } = req.file;
  const {
    productImage,
    productName,
    productDescription,
    productPrice,
    productCategory,
    productQuantity,
  } = req.body;
  try {
    let product = new Product({
      fileName: filename,
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQuantity,
    });

    const savedProduct = await product.save();
    res.json({
      successMessage: `${productName} was created`,
      product: savedProduct,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMessage: "Please try again" });
  }
};
