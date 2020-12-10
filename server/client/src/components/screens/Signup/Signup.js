import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./signup.css";
import { isEmpty, isEmail, equals } from "validator";
import { showErrorMessage, showSuccessMessage } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { signup } from "../../api/signup";
import { isAuthenticated } from "../../helpers/auth";
const Signup = () => {
  // useHistory history for redirecting
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard");
    }
  }, [history]);
  // set formdata state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  //destructure form data state
  const {
    username,
    email,
    password,
    confirmPassword,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  /* event handlers */
  //handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Please enter a valid email",
      });
    } else if (!equals(password, confirmPassword)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const { email, username, password } = formData;
      const data = { email, username, password };
      setFormData({
        ...formData,
        loading: true,
      });
      signup(data)
        .then((response) => {
          console.log(response);
          setFormData({
            ...formData,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((error) => {
          console.log(error.response);
          setFormData({
            ...formData,
            errorMsg: error.response.data.errorMessage,
          });
        });
    }
  };

  const showSignup = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
          </span>
        </div>
        <input
          className="form-control"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          type="text"
          value={username}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <input
          className="form-control"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          type="text"
          value={email}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          className="form-control"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          value={password}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          className="form-control"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
        />
      </div>

      <div className="form-group">
        <button type="submit" className=" btn btn-primary btn-block">
          Signup
        </button>
      </div>
      <p className="text-center">
        Have an account? <Link to="/signin">Log In</Link>
      </p>
    </form>
  );
  return (
    <div className="signup-main-container ">
      <div className="signup-container">
        {errorMsg && (
          <div className="text-center">{showErrorMessage(errorMsg)}</div>
        )}
        {successMsg && (
          <div className="text-center"> {showSuccessMessage(successMsg)} </div>
        )}
        {loading && <div className="text-center"> {showLoading()} </div>}
        {showSignup()}
      </div>
    </div>
  );
};

export default Signup;
