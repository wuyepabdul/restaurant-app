import React, { Fragment, useState, useEffect } from "react";
import { isEmpty } from "validator";
import { showErrorMessage, showSuccessMessage } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { createProduct } from "../../api/product";
import { getCategories } from "../../api/category";

const AdminFoodModal = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  // set formdata state
  const [formData, setFormData] = useState({
    errorMsg: false,
    successMsg: false,
  });

  const { successMsg, errorMsg } = formData;

  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productQuantity: "",
  });

  const {
    productImage,
    productName,
    productDescription,
    productPrice,
    productCategory,
    productQuantity,
  } = productData;

  //load categories on page load from db
  useEffect(() => {
    loadCategories();
  }, [loading]);
  // handle reset messages

  const handleResetMessages = (e) => {
    setFormData({
      ...formData,
      errorMsg: "",
      successMsg: "",
      [e.target.name]: "",
    });
  };

  // handleProductImage
  const handleProductImage = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0],
    });
  };

  //handleProductChange
  const handleProductChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };
  //handle product submit
  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (productImage === null) {
      setFormData({
        ...formData,
        errorMsg: "Please select an Image",
      });
    } else if (
      isEmpty(productName) ||
      isEmpty(productDescription) ||
      isEmpty(productPrice)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (isEmpty(productCategory)) {
      setFormData({
        ...formData,
        errorMsg: "Please select a category",
      });
    } else if (isEmpty(productQuantity)) {
      setFormData({
        ...formData,
        errorMsg: "Please select a quantity",
      });
    } else {
      let formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQuantity", productQuantity);

      setLoading(true);
      createProduct(formData)
        .then((response) => {
          setLoading(false);
          setProductData({
            productImage: null,
            productName: "",
            productDescription: "",
            productPrice: "",
            productCategory: "",
            productQuantity: "",
          });

          setFormData({
            ...formData,
            successMsg: response.data.successMessage,
          });
        })
        .catch((error) => {
          setLoading(false);
          setFormData({
            ...formData,
            errorMsg: error.response.data.errorMessage,
          });
        });
    }
  };

  const loadCategories = async () => {
    await getCategories()
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const showFoodModal = () => (
    <div id="addFoodModal" className="modal" onClick={handleResetMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">Add Category</h5>
              <button className="close" data-dismiss="modal">
                <span>
                  <i className="fas fa-times"></i>{" "}
                </span>
              </button>
            </div>
            <div className="modal-body my-2">
              {errorMsg && (
                <div className="text-center">{showErrorMessage(errorMsg)}</div>
              )}
              {successMsg && (
                <div className="text-center">
                  {showSuccessMessage(successMsg)}
                </div>
              )}
              {loading ? (
                <div className="text-center"> {showLoading()} </div>
              ) : (
                <Fragment>
                  <div className="custom-file mb-2">
                    <input
                      type="file"
                      className="custom-file-input "
                      name="productImage"
                      onChange={handleProductImage}
                    />
                    <label className="custom-file-label">Choose File</label>
                  </div>
                  <div className="form-group">
                    <label className="text-secondary">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productName"
                      value={productName}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-secondary">Description</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      name="productDescription"
                      value={productDescription}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-secondary">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productPrice"
                      onChange={handleProductChange}
                      value={productPrice}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label className="text-secondary">Category</label>
                      <select
                        className="custom-select mr-sm-3"
                        onChange={handleProductChange}
                        name="productCategory"
                      >
                        <option>Choose one...</option>
                        {categories &&
                          categories.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.category}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group col-md-6">
                      <label className="text-secondary">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        name="productQuantity"
                        onChange={handleProductChange}
                        value={productQuantity}
                        min="0"
                        max="1000"
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button className="btn btn-warning text-white" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return <section>{showFoodModal()}</section>;
};

export default AdminFoodModal;
