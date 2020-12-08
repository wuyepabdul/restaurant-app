import React, { Fragment, useState } from "react";
import { isEmpty } from "validator";
import { showErrorMessage, showSuccessMessage } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { createCategory } from "../../api/category";

const AdminCategoryModal = () => {
  const [loading, setLoading] = useState(false);

  // set formdata state
  const [formData, setFormData] = useState({
    category: "",

    errorMsg: false,
    successMsg: false,
  });

  const { category, successMsg, errorMsg } = formData;

  const handleResetMessages = (e) => {
    setFormData({
      ...formData,
      errorMsg: "",
      successMsg: "",
      [e.target.name]: "",
    });
  };

  //handle change
  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: "",
      successMsg: "",
    });
  };

  // handle category submit
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else {
      const { category } = formData;
      const data = { category };
      setLoading(true);
      createCategory(data)
        .then((response) => {
          setLoading(false);
          setFormData({
            ...formData,
            successMsg: response.data.successMessage,
            category: "",
          });
        })
        .catch((error) => {
          setLoading(false);
          setFormData({
            ...formData,
            errorMsg: error.response.data.errorMessage,
            category: "",
          });
        });
    }
  };

  const AdminCategoryModal = () => (
    <div id="addCategoryModal" className="modal" onClick={handleResetMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
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
                  <label className="text-secondary"> Category</label>
                  <input
                    type="text"
                    className="form-control text-secondary"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </Fragment>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button className="btn btn-info" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return <section>{AdminCategoryModal()}</section>;
};

export default AdminCategoryModal;
