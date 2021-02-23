import React from "react";

const Login = () => {
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
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="password"
              placeholder="password"
              required
            />
          </div>

          <div>
            <button type="button" className="btn btn-outline-success">
              Submit
            </button>
          </div>

          <div>
            <button type="button" className="btn btn-outline-warning">
              Login using Google
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
