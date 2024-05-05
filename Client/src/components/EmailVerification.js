// EmailVerification.js
import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value)
    setError("");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    // Check if email is from valid domain
    if (!email.endsWith('@sltc.ac.lk')) {
      setError("Please enter a valid SLTC email address");
      return;
    }
  
    try {
      // Generate and send OTP
      const response = await axios.post('http://localhost:3001/api/email/sendOTP', { email });
      // Log response
      if(response.data.success){
        setEmailMessage("Please Enter the OTP");
        sessionStorage.setItem('otp', response.data.otp);
      }else{
        setEmailMessage("OPPS! Something went wrong");
      }      
      // Handle success, show OTP input
    } catch (error) {
      // Handle error
      setError("Failed to send OTP. Please try again later.");
    }
  };  

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const storedOtp = sessionStorage.getItem('otp');
    if( storedOtp == otp ) navigate('/signup', { state: { email } });
    else setError("Invalid OTP. Please try again.");
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row custom-row">
          <div className="col-sm-12 welcome-msg">
            <h1>OTP</h1>
            <p>Please enter the OTP to verify your email.</p>
          </div>
        </div>
      </div>
      <div className="row custom-row">
        <div className="col-sm-8 otp-form-container">
          <form>
            <h2>Email Verification</h2>
            <div className="form-message" style={{ display: error ? "flex" : "none" }}>
              {error && <p>{error}</p>}
            </div>
            <div className="form-message" style={{ display: emailMessage ? "flex" : "none" }}>
              {emailMessage && <p>{emailMessage}</p>}
            </div>
            <div className="otp-email-box" style={{ display: ! emailMessage ? "flex" : "none" }} >
              <input placeholder="Enter Email" type="email" value={email} onChange={handleEmailChange} />
              <button onClick={handleSendOtp}>Send OTP</button>
            </div>

            <div className="otp-box" style={{ display: emailMessage ? "flex" : "none" }}>
              <input placeholder="Enter OTP" type="text" value={otp} onChange={handleOtpChange} />
              <button onClick={handleVerifyOtp}>Verify OTP</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;