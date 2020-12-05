import React, { Fragment, useState } from "react";
import { isEmpty } from "validator";
import { showErrorMessage, showSuccessMessage } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { createCategory } from "../../api/category";
const Admin = () => {
  // set formdata state
  const [formData, setFormData] = useState({
    category: "",

    loading: false,
    errorMsg: false,
    successMsg: false,
  });

  //destructure form data state
  const { category, successMsg, errorMsg, loading } = formData;

  // handle reset messages

  const handleResetMessages = (e) => {
    setFormData({
      ...formData,
      errorMsg: "",
      successMsg: "",
      [e.target.name]: "",
    });
  };

  /* event handlers */
  //handle change
  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: "",
      successMsg: "",
    });
  };

  // handle submit
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
      setFormData({
        ...formData,
        loading: true,
      });
      createCategory(data)
        .then((response) => {
          setFormData({
            ...formData,
            loading: false,
            successMsg: response.data.successMessage,
            category: "",
          });
        })
        .catch((error) => {
          setFormData({
            ...formData,
            errorMsg: error.response.data.errorMessage,
            category: "",
          });
        });
    }
  };

  const showHeader = () => (
    <div className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <i className="fas fa-home"> Dashboard</i>
          </div>
        </div>
      </div>
    </div>
  );
  const showActionButtons = () => (
    <div className="bg-light my-2">
      <div className="container">
        <div className="row pb-3">
          <div className="col-md-4  my-1">
            <button
              className="btn btn-outline-info btn-block"
              data-toggle="modal"
              data-target="#addCategoryModal"
            >
              <i className="fas fa-plus"> Add Category </i>
            </button>
          </div>
          <div className="col-md-4  my-1">
            <button className="btn btn-outline-warning btn-block">
              <i className="fas fa-plus"> Add Food </i>
            </button>
          </div>
          <div className="col-md-4  my-1">
            <button className="btn btn-outline-success btn-block">
              <i className="fas fa-money-check-alt"> View Orders </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const showCategoryModal = () => (
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

  return (
    <section>
      {showHeader()}
      {showActionButtons()}
      {showCategoryModal()}
    </section>
  );
};

export default Admin;
