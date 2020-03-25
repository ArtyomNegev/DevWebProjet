import React from "react";
import { Switch, Route } from "react-router-dom";
import Accueil from "./accueil";
import Contact from "./contact";
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Accueil />
      </Route>
      <Route path="/accueil">
        <Accueil />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
    </Switch>
  );
};

export default Routes;
