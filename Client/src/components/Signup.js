import React, { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";

import axios from 'axios';

export default function Signup() {
  const location = useLocation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole]= useState("");
  const [degree, setDegree]= useState("");
  const [school, setSchool]= useState("");
  const [year, setYear]= useState("");

  const [regNumberError, setRegNumberError]= useState(false);
  const [emailError, setEmailError]= useState(false);
  const [passwordError, setPasswordError]= useState(false);
  
  const [isTeacher, setIsTeacher]= useState(false);

  useEffect(() => {
    // Access email from location state
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  useEffect(() => {
    if (role=="teacher") {
      setIsTeacher(true);
    }else{
      setIsTeacher(false);
    }
  }, [role,isTeacher]);

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

    if( role=='student' ){
      if( !role || !firstName || !lastName || !regNumber || !email || !degree || !year || (password !== confirmPassword) ){
          if( !role ) return;
          if( !firstName ) return;
          if( !lastName ) return;
          if( !regNumber ) return;
          if( !degree ) return;
          if( !year ) return;
          if( !email ) setEmailError(true);
          if( password !== confirmPassword ) setPasswordError(true);
          return ;
      }
      const registerInfo={role, firstName, lastName, regNumber, email, password, degree, year}

      axios
          .post( 'http://localhost:3001/api/user/register', registerInfo)
          .then(res=>{
              alert(res.data.msg);
              navigate('/login');
            })
          .catch(error=>{
              console.log(error)
              alert(error.response.data.msg);
            });
    }
    if( role==='teacher' ){
      if( !role || !firstName || !lastName || !regNumber || !email || !school || (password !== confirmPassword) ){
          if( !role ) return;
          if( !firstName ) return;
          if( !lastName ) return;
          if( !regNumber ) return;
          if( !school ) return;
          if( !year ) return;
          if( !email ) setEmailError(true);
          if( password !== confirmPassword ) setPasswordError(true);
          return ;
      }
      const registerInfo={role, firstName, lastName, regNumber, email, password, school}

      axios
          .post( 'http://localhost:3001/api/user/register', registerInfo)
          .then(res=>{
              alert(res.data.msg);
              navigate('/login');
            })
          .catch(error=>{
              alert(error.response.data.msg);
            });
    }
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
              <div className="form-user-container" style={{display: ! isTeacher ? 'flex' : 'none' }}>
                <label for="reg-number">Registration Number</label>
                <input
                  type="text"
                  name="reg-number"
                  placeholder="Registration Number"
                  value={regNumber}
                  onChange={(e)=> setRegNumber(e.target.value)}
                />
              </div>
              <div className="form-user-container" style={{display: isTeacher ? 'flex' : 'none' }}>
                <label for="teacher-id">Teacher ID</label>
                <input
                  type="text"
                  name="teacher-id"
                  placeholder="Teacher ID"
                  value={regNumber}
                  onChange={(e)=> setRegNumber(e.target.value)}
                />
              </div>
              <div className="form-user-container" style={{display: ! isTeacher ? 'flex' : 'none' }}>
                <label for="batch">Degree</label>
                <select
                  name="batch"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                >
                  <option value="">Select Degree</option>
                  <option value="Bachelor of IT in Cloud Computing">Bachelor of IT in Cloud Computing</option>
                  <option value="Bachelor of IT in Cyber Security">Bachelor of IT in Cyber Security</option>
                  <option value="Bachelor of IT in Data Science">Bachelor of IT in Data Science</option>
                  <option value="Bachelor of IT in Software Engineering">Bachelor of IT in Software Engineering</option>
                </select>
              </div>
              <div className="form-user-container" style={{display: isTeacher ? 'flex' : 'none' }}>
                <label for="faculty">Faculty</label>
                <select
                  name="faculty"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                >
                  <option value="">Select School</option>
                  <option value="IT School">IT & Cloud Computing</option>
                  <option value="Business School">Business School</option>
                  <option value="Engineering School">Engineering School</option>
                  <option value="Music School">Music School</option>
                </select>
              </div>
              <div className="form-user-container" style={{display: ! isTeacher ? 'flex' : 'none' }}>
                <label for="enroll-year">Enroll Year</label>
                <input
                  type="text"
                  name="enroll-year"
                  placeholder="Enroll Year"
                  value={year}
                  onChange={(e)=> setYear(e.target.value)}
                />
              </div>
              <div className="form-user-container">
                <label for="email">Email</label>
                <input
                  /// disabled={!isTeacher}
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
