import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [role, setRole]         = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginForm = async (e) =>{
    e.preventDefault();
    if( role && username && password ){
      try {
        const response = await axios.post('http://localhost:3001/api/user/login', { username, password });
        const { token,...other } = response.data;

        // Redirect
        if( token ){
          // Store the token in localStorage (need to change to session storage)
          localStorage.setItem('token', token ); 
          localStorage.setItem('data', JSON.stringify(other)); 
          localStorage.setItem('message', 'You have successfully logged in.' ); 
          if(role=='student') navigate('/student',{ state: other });
          if(role=='teacher') navigate('/teacher',{ state: other });
        }
      } catch (error) {
        // Handle login error
        if (error.response) {
          console.error('Login failed:', error.response.data.msg);
          alert(error.response.data.msg);
        } else {
          console.error('Login failed:', error.message);
        }
      } 
    }
  }

  return (
      <div className="container-fluid login-container">
        <div className="row custom-row">
          <div className="col-sm-5 login-left-container">
            <h1>Sign In To Continue</h1>
            <p>
              By signing in, you can easily take and track your attendance. Let’s make every class count! 😊
            </p>
          </div>
          <div className="col-sm-7 login-right-container">
            <form className="login-form" onSubmit={handleLoginForm}>
                <div className="form-choice-container">
                  <div className="role">
                    <input
                      type="radio"
                      id="teacher"
                      name="choice"
                      value="teacher"
                      onChange={(e)=> setRole(e.target.value)}
                      required
                    />
                    <label for="teacher">Teacher</label>
                  </div>
                  <div className="role">
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
                </div>

                <div className="form-user-container">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Email Address"
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
                  <button type="submit">Sign in</button>
                </div>

                <div className="form-bottom">
                  <Link to="#">Forgot Password</Link>
                  <p>
                    <span>Don't have an account? </span>
                    <span>
                      <Link to="/verify-email">Register Here</Link>
                    </span>
                  </p>
                </div>
            </form>
          </div>
        </div>
      </div>
  );
}
