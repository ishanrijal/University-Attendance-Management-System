import React, { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole]= useState("");

  const [roleError, setRoleError]= useState(false);
  const [firNameError, setFirstNameError]= useState(false);
  const [lastNameError, setLastNameError]= useState(false);
  const [regNumberError, setRegNumberError]= useState(false);
  const [emailError, setEmailError]= useState(false);
  const [passwordError, setPasswordError]= useState(false);

  const handleRoleChange=(e)=>{
    setRole(e.target.value);
  }
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    if( !role || !firstName || !lastName || !regNumber || !email || !password ){
        if(!role) setRoleError(true);
        if(!firstName) setFirstNameError(true);
        if(!lastName) setLastNameError(true);
        if(!regNumber) setRegNumberError(true);
        if(!email) setEmailError(true);
        if(!password) setPasswordError(true);
        
        return ;
    }
    const registerInfo={role, firstName, lastName, regNumber, email, password}
    alert(`Form submitted: ${registerInfo}`);
    axios.post( 'http://localhost:3005/register', registerInfo)
    .then(res=>{console.log(res)});
  }

  return (
    <div className="signup-page">
      <Header />
      <div className="container signup-container">
        <div className="row">
          <div className="col-sm-6">
            <h1>Signup</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it.
            </p>
          </div>
          <div className="col-sm-6 ">
            <form className="signup-form" onSubmit={handleFormSubmit}>
              <div className="form-choice-container">
                <input
                  type="radio"
                  id="teacher"
                  name="choice"
                  value="teacher"
                  onChange={handleRoleChange}
                />
                <label for="teacher">Teacher</label>
                <input
                  type="radio"
                  id="student"
                  name="choice"
                  value="student"
                  onChange={handleRoleChange}
                />
                <label for="student">Student</label>
                <input
                  type="radio"
                  id="admin"
                  name="choice"
                  value="admin"
                  onChange={handleRoleChange}
                />
                <label for="admin">Admin</label>
              </div>

              <div className="form-user-container">
                <label for="first-name">First Name</label>
                <input
                  type="text"
                  name="first-name"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-user-container">
                <label for="last-name">Last Name</label>
                <input
                  type="text"
                  name="last-name"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-user-container">
                <label for="reg-number">Registration Number</label>
                <input
                  type="text"
                  name="reg-number"
                  placeholder="Registration Number"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                />
              </div>
              <div className="form-user-container">
                <label for="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="form-password-container">
                <label for="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-btn">
                <button type="submit">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
