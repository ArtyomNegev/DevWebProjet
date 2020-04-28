import React from "react";
import { Switch, Route } from "react-router-dom";
import Accueil from "./accueil";
import Contact from "./contact";
import Login from "./login";
import NavTabs from "./navtab";
import Signup from "./signup";
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <NavTabs />
      </Route>
      <Route path="/accueil">
        <Accueil />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
};

export default Routes;
