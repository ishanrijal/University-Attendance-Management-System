import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

import axios from 'axios';

export default function Signup() {
  const location = useLocation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole]= useState("");

  const [regNumberError, setRegNumberError]= useState(false);
  const [emailError, setEmailError]= useState(false);
  const [passwordError, setPasswordError]= useState(false);

  useEffect(() => {
    // Access email from location state
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleEmail=(e)=>{
        setEmail(e.target.value);
        setEmailError(false);
  }
  const handlePassword=(e)=>{
    setPassword(e.target.value);
    setPasswordError(false);  //hiding the password not match message
    
  }
  const handleConfirmPassword=(e)=>{
    const confirmPass=e.target.value;
    setConfirmPassword(confirmPass);
    setPasswordError(prevState=>{
      if( password!==confirmPass ){
        return true;
      }else{
        return false;
      }
    })
  }
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    
    // Reset error states
    setRegNumberError(false);
    setEmailError(false);
    setPasswordError(false);
    if( !role || !firstName || !lastName || !regNumber || !email || (password !== confirmPassword) ){
        if( !role ) return;
        if( !firstName ) return;
        if( !lastName ) return;
        if( !regNumber ) return;
        if( !email ) setEmailError(true);
        if( password !== confirmPassword ) setPasswordError(true);
        return ;
    }
    const registerInfo={role, firstName, lastName, regNumber, email, password}
    axios.post( 'http://localhost:3005/api/user/register', registerInfo)
         .then(res=>{
            alert(res.data.msg);
          })
         .catch(error=>{
            alert(error.response.data.msg);
          });
  }

  return (
    <div className="signup-page">
      <div className="container-fluid signup-container">
        <div className="row custom-row">
          <div className="col-sm-6 signup-left-container">
            <h1>Signup</h1>
            <p>
             Signup
            </p>
          </div>
          <div className="col-sm-6 ">
            <form className="signup-form" onSubmit={handleFormSubmit}>
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
                <label for="first-name">First Name</label>
                <input
                  type="text"
                  name="first-name"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-user-container">
                <label for="last-name">Last Name</label>
                <input
                  type="text"
                  name="last-name"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-user-container">
                <label for="reg-number">Registration Number</label>
                <input
                  type="text"
                  name="reg-number"
                  placeholder="Registration Number"
                  value={regNumber}
                  onChange={(e)=> setRegNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-user-container">
                <label for="email">Email</label>
                <input
                  disabled
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
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
                  onChange={handlePassword}
                  required
                />
              </div>
              <div className="form-password-container">
                <label for="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  name="confirm-password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  required
                />
                <p>{passwordError ? "Password Didn't Match": ""}</p>
              </div>
              <div className="form-btn">
                <button type="submit">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
