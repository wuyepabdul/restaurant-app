import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../helpers/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};

export default AdminRoute;
