import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./components/screens/Dashboard/Admin";
import User from "./components/screens/Dashboard/User";
import Header from "./components/screens/Header/Header";
import Home from "./components/screens/Home/Home";
import Notfound from "./components/screens/Notfound/Notfound";
import AdminRoute from "./components/screens/ProtectedRoute/AdminRoute";
import UserRoute from "./components/screens/ProtectedRoute/UserRoute";
import Signin from "./components/screens/Signin/Signin";
import Signup from "./components/screens/Signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <AdminRoute exact path="/admin/dashboard" component={Admin} />
          <UserRoute exact path="/user/dashboard" component={User} />
          <Route component={Notfound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
