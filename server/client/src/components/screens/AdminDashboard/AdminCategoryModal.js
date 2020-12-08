import React, { Fragment, useState } from "react";
import { isEmpty } from "validator";
import { showErrorMessage, showSuccessMessage } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../../../redux/actions/messagesAction";
import { createCategory } from "../../../redux/actions/categoryAction";

const AdminCategoryModal = () => {
  /* REDUX GLOBAL STATE PROPERTIES */
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  /* COMPONENT STATE */
  const [componentErrorMsg, setComponentErrorMsg] = useState("");
  // set formdata state
  const [category, setCategory] = useState("");

  const handleResetMessages = (e) => {
    dispatch(clearMessages());
    setComponentErrorMsg("");
    setCategory("");
  };

  //handle change
  const handleCategoryChange = (e) => {
    dispatch(clearMessages());
    setComponentErrorMsg("");
    setCategory(e.target.value);
  };

  // handle category submit
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setComponentErrorMsg("Please enter a category");
    } else {
      const data = { category };
      dispatch(createCategory(data));
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
              {componentErrorMsg && (
                <div className="text-center">
                  {showErrorMessage(componentErrorMsg)}
                </div>
              )}
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
