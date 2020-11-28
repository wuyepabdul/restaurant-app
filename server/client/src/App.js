import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Notfound from "./components/Notfound/Notfound";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route component={Notfound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
