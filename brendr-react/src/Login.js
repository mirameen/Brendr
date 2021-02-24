import React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {UserContext} from './App'

const loginEndpoint = '/api/users/login'


function loginUsingGoogle() {
  // TODO
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useContext(UserContext);
  let history = useHistory();


  function submit(details) {
    axios.post(loginEndpoint, details).then(res => {
      console.log(res);
      if(res.data.success === true) {
        user.setcurrUser(res.data);
        sessionStorage.setItem('loggedInUser',JSON.stringify(res.data));
        alert("Logged in Successfuly") 
        history.push("/");
      }
      else{
        alert("Please enter username and password again");
      }
    });
    setUsername('');
    setPassword('');
  }

  return (
    <React.Fragment>
      <div className="content">
        <h1>Login</h1>
        <form action="/login" method="POST">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onInput={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onInput={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button type="button" className="btn btn-outline-success" onClick={() => submit({
              username: username,
              password: password
            })}>
              Submit
            </button>
          </div>

          <div>
            <button type="button" className="btn btn-outline-warning" onClick={() => loginUsingGoogle()}>
              Login using Google
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
