import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [role, setRole]         = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginForm = async (e) =>{
    e.preventDefault();
    console.log("PRessed")
    if( role && username && password ){
      try {
        const response = await axios.post('http://localhost:3005/api/user/login', { username, password });
        const { token } = response.data;
        console.log("Hey pressed");
        console.log(token);
        console.log(response);

        // Store the token in localStorage (need to change to session storage)
        localStorage.setItem('token', token); 

        // Redirect
        window.location.href = '/'; 
      } catch (error) {
        // Handle login error
        if (error.response) {
          console.error('Login failed:', error.response.data.msg);
        } else {
          console.error('Login failed:', error.message);
        }
      } 
    }
  }

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
            <form className="login-form" onSubmit={handleLoginForm}>
              <div className="form-choice-container">
                <input
                  type="radio"
                  id="teacher"
                  name="choice"
                  value="teacher"
                  onChange={(e)=> setRole(e.target.value)}
                  required
                />
                <label for="teacher">Teacher</label>
                <input
                  type="radio"
                  id="student"
                  name="choice"
                  value="student"
                  onChange={(e)=> setRole(e.target.value)}
                  required
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
                  required
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
                  required
                />
              </div>

              <div className="checkbox">
                <input type="checkbox" name="remember" />
                <label for="remember">Remember me</label>
              </div>

              <div className="form-btn">
                <button type="submit">Login</button>
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
