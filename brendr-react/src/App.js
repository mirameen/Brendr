import React from "react";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login"
import Signup from "./Signup"
import Lend from "./Lend"
import Borrow from "./Borrow"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Nav />
        <Switch>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route exact path = "/lend">
            <Lend />
          </Route>
          <Route exact path = "/borrow">
            <Borrow />
          </Route>
          <Route exact path = "/login">
            <Login />
          </Route>
          <Route exact path = "/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;