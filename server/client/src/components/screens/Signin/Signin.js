import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./sigin.css";
import { isEmpty, isEmail } from "validator";
import { showErrorMessage } from "../../helpers/message";
import { showLoading } from "../../helpers/loading";
import { signin } from "../../api/signin";
import { isAuthenticated, setAuthentication } from "../../helpers/auth";
const Signin = () => {
  //useHistory hook for redirecting
  const history = useHistory();
  //useEffect hook
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard");
    }
  }, [history]);

  // set formdata state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loading: false,
    errorMsg: false,
  });

  //destructure form data state
  const { email, password, errorMsg, loading } = formData;

  /* event handlers */
  //handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: "",
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Please enter a valid email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };
      setFormData({
        ...formData,
        loading: true,
      });
      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);
          if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push("/admin/dashboard");
          } else {
            history.push("/user/dashboard");
          }
          setFormData({
            ...formData,
            loading: false,
          });
        })
        .catch((error) => {
          setFormData({
            ...formData,
            errorMsg: error.response.data.errorMessage,
          });
        });
    }
  };

  const showSignin = () => (
    <form onSubmit={handleSubmit}>
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

      <div className="form-group">
        <button type="submit" className=" btn btn-primary btn-block">
          Login
        </button>
      </div>
      <p className="text-center">
        Don't have an account? <Link to="/signup">Create One</Link>
      </p>
    </form>
  );
  return (
    <div className="signup-main-container ">
      <div className="signup-container">
        {errorMsg && (
          <div className="text-center">{showErrorMessage(errorMsg)}</div>
        )}

        {loading && <div className="text-center"> {showLoading()} </div>}
        {showSignin()}
      </div>
    </div>
  );
};

export default Signin;
