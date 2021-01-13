const Product = require("../models/ProductModel");
const fs = require("fs");

exports.create = async (req, res) => {
  console.log("req.user: ", req.user);
  console.log("req.file: ", req.file);
  console.log("req.body: ", req.body);

  const { filename } = req.file;
  const {
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

exports.readAll = async (req, res) => {
  try {
    const products = await Product.find({}).populate(
      "productCategory",
      "category"
    );
    if (products) {
      res.json({ products });
    } else {
      res.status(404).json({ errorMessage: "No Products at this time" });
    }
  } catch (error) {
    console.log(error, "productController readAll error");
    res.status(500).json({ errorMessage: "Please try again" });
  }
};

exports.delete = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    //delete product from file system
    fs.unlink(`uploads/${deletedProduct.fileName}`, (err) => {
      if (err) throw err;
      console.log(
        "image successfully deleted from fileSystem",
        deletedProduct.fileName
      );
    });
    res.json(deletedProduct);
  } catch (error) {
    console.log(error, "productController delete error");
    res.status(500).json({ errorMessage: "Please try again" });
  }
};
