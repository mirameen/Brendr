import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const signupEndpoint = '/api/users/register'



function signupUsingGoogle() {
  // TODO
}

function Signup() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  function submit(details) {
    axios.post(signupEndpoint, details).then(res => {
      if(res.data.success === true){
        alert("Successfully Registered");
        history.push('/login');
      }
      else{
        alert("Register again");
      }
    })
  }

  return (
    <React.Fragment>
      <div className="signup-content">
        <h1>Register</h1>
        <form action="/register" method="POST" onSubmit={(e)=>e.preventDefault}>
          <div className="form-row">
            <div className="col-md-6">
              <label htmlFor="name01">First name</label>
              <input
                type="text"
                className="form-control"
                id="name01"
                name="firstname"
                placeholder="first name"
                value={firstname}
                onInput={e => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="name02">Last name</label>
              <input
                type="text"
                className="form-control"
                id="name02"
                name="lastname"
                placeholder="last name"
                value={lastname}
                onInput={e => setLastname(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email01">Email Address</label>
            <input
              className="form-control"
              type="text"
              id="email01"
              name="email"
              placeholder="email"
              value={email}
              onInput={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact01">Mobile Number</label>
            <input
              className="form-control"
              type="text"
              id="contact01"
              name="contact"
              placeholder="contact"
              value={mobile}
              onInput={e => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username01">Username</label>
            <input
              className="form-control"
              type="text"
              id="username01"
              name="username"
              placeholder="username"
              value={username}
              onInput={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password01">Password</label>
            <input
              className="form-control"
              type="password"
              id="password01"
              name="password"
              placeholder="password"
              value={password}
              onInput={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="button-align">
            <button type="button" className="btn btn-outline-success" onClick={() => submit({
              firstname: firstname,
              lastname: lastname,
              email: email,
              mobile: mobile,
              username: username,
              password: password
            })}>
              Submit
            </button>
          </div>

          <div className="button-align">
            <button type="button" className="btn btn-outline-warning" onClick={() => signupUsingGoogle()}>
              Sign Up using Google
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Signup;
