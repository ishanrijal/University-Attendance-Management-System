import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <Header />
      <div className="container login-container">
        <div className="row">
          <div className="col-sm-6">
            <h1>University Attendance</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it.
            </p>
          </div>
          <div className="col-sm-6 ">
            <form className="login-form">
              <div className="form-choice-container">
                <input
                  type="radio"
                  id="teacher"
                  name="choice"
                  value="teacher"
                />
                <label for="teacher">Teacher</label>
                <input
                  type="radio"
                  id="student"
                  name="choice"
                  value="student"
                />
                <label for="student">Student</label>
              </div>

              <div className="form-user-container">
                <label for="username">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-password-container">
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="checkbox">
                <input type="checkbox" name="remember" />
                <label for="remember">Remember me</label>
              </div>

              <div className="form-btn">
                <button type="button">Login</button>
              </div>

              <div className="form-bottom">
                <Link>Forgot Password ?</Link>
                <p>
                  <span>Don't have an account?</span>
                  <span>
                    <Link>Register Here</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
