import React from "react";

const Signup = () => {
  return (
    <React.Fragment>
      <div className="signup-content">
        <h1>Register</h1>
        <form action="/register" method="POST">
          <div className="form-row">
            <div className="col-md-6">
              <label for="name01">First name</label>
              <input
                type="text"
                className="form-control"
                id="name01"
                name="firstname"
                placeholder="first name"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="name02">Last name</label>
              <input
                type="text"
                className="form-control"
                id="name02"
                name="lastname"
                placeholder="last name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label for="email01">Email Address</label>
            <input
              className="form-control"
              type="text"
              id="email01"
              name="email"
              placeholder="email"
              required
            />
          </div>

          <div className="form-group">
            <label for="contact01">Mobile Number</label>
            <input
              className="form-control"
              type="text"
              id="contact01"
              name="contact"
              placeholder="contact"
              required
            />
          </div>

          <div className="form-group">
            <label for="username01">Username</label>
            <input
              className="form-control"
              type="text"
              id="username01"
              name="username"
              placeholder="username"
              required
            />
          </div>

          <div className="form-group">
            <label for="password01">Password</label>
            <input
              className="form-control"
              type="text"
              id="password01"
              name="password"
              placeholder="password"
              required
            />
          </div>

          <div className="button-align">
            <button type="button" className="btn btn-outline-success">
              Submit
            </button>
          </div>

          <div className="button-align">
            <button type="button" className="btn btn-outline-warning">
              Sign Up using Google
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Signup;
