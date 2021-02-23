import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const loginEndpoint = '/login'

function submit(details) {
  axios.post(loginEndpoint, details)
}

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
              type="text"
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
            <button type="button" className="btn btn-outline-warning" onClick={() => submit({
              username: username,
              password: password,
              loginUsingGoogle: true
            })}>
              Login using Google
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;