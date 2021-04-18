import React, { useState } from "react";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import Lend from "./Lend";
import Borrow from "./Borrow";
import User from "./User";
import Complaint from "./Complaint";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const UserContext = React.createContext();
export const RequestIDContext = React.createContext();

function App() {
  const [currUser,setcurrUser] = useState(JSON.parse(sessionStorage.getItem('loggedInUser')));
  const [currRequestID, setcurrRequestID] = useState('');
  return (
    <React.Fragment>
      <RequestIDContext.Provider value = {{currRequestID, setcurrRequestID}}>
      <UserContext.Provider value = {{currUser, setcurrUser}}>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/lend">
              <Lend />
            </Route>
            <Route exact path="/borrow">
              <Borrow />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
            <Route exact path="/complaint">
              <Complaint />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
      </RequestIDContext.Provider>
    </React.Fragment>
  );
}

export default App;
