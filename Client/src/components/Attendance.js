import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Attendance() {
  const [error, setError] = useState(null);
  const [qrCodeData, setQRCodeData] = useState(localStorage.getItem('studentQR'));
  const [attendanceId, setAttendanceId] = useState(localStorage.getItem('attendanceId'));
  const [attendanceOtp, setAttendanceOtp] = useState(localStorage.getItem('otp'));
  const [otp, setOtp] = useState('');
  const [attendanceSuccessMessage, setAttendanceSuccessMessage] = useState('');
  const [attendanceStudentData, setAttendanceStudentData] = useState('');

  const [takingAttendance, setTakingAttendance] = useState(false);

  const [data, setData] = useState('');
  const [moduleCode, setModuleCode] = useState('');

  const [classID, setClassID] = useState('');
  const [school, setSchool] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'moduleCode') {
      setModuleCode(value);
    } else if (name === 'classID') {
      setClassID(value);
    } else if (name === 'school') {
      setSchool(value);
    } else if (name === 'otp') {
      setOtp(value);
    }
  };

  const fetchCourseList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/class/get-post');
      setData(response.data);
    } catch (error) {
      console.error('Error getting course data:', error);
    }
  };
  useEffect(() => {
    fetchCourseList();
  }, []);

  const takeAttendance = async (e) => {
    e.preventDefault();
    if (!moduleCode) {
      return;
    }
    try {
      const studentId = JSON.parse(localStorage.getItem('data')).user._id
      const response = await axios.post('http://localhost:3001/api/attendance/get-my-qr', {
        classId: moduleCode,
        studentId: studentId
      });
      localStorage.setItem('studentQR', response.data.qrCode);
      localStorage.setItem('attendanceId', response.data.id);
      localStorage.setItem('otp', response.data.otp);
      setQRCodeData(response.data.qrCode);
      setAttendanceId(response.data.id);
      setTakingAttendance(true);
    } catch (error) {
      console.error('Error fetching QR code data:', error);
      alert(error.response.data.error);
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    const studentId = JSON.parse(localStorage.getItem('data')).user._id

    try {
      const response = await axios.put('http://localhost:3001/api/attendance/update-my-attendance', {
        attendanceId: attendanceId,
        otp: otp,
        studentId: studentId
      });
      localStorage.setItem('otp', response.data.otp);
      alert(response.data.message)
      setAttendanceSuccessMessage(response.data.message)
      localStorage.removeItem('studentQR');
      localStorage.removeItem('attendanceId');
      localStorage.removeItem('otp');
      setTakingAttendance(false);
      setOtp('');
      setAttendanceStudentData(response.data.attendance.students);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert(error.response.data.error);
    }
  };

  return (
    <>
      <h1>Select Course</h1>
      <div className='row' style={{display: ! takingAttendance ? 'flex' : 'none' }}>
        <div className='col-sm-4'>
          <div className="box">
            <label htmlFor="moduleCode" className='mb-2'>Modules</label>
            <select className="form-select" id="moduleCode" name="moduleCode" value={moduleCode} onChange={handleChange}>
              <option value="">Select Modules</option>
              {data && data.map(course => (
                <option value={course._id} key={course._id}>{course.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='col-sm-4'>
          <div className="box">
            <label htmlFor="school" className='mb-2'>School</label>
            <select className="form-select" id="school" name="school" value={school} onChange={handleChange}>
              <option value="">Select School</option>
              <option value="IT School">IT & Cloud Computing</option>
              <option value="Business School">Business School</option>
              <option value="Engineering School">Engineering School</option>
              <option value="Music School">Music School</option>
            </select>
          </div>
        </div>
        <div className='col-sm-4'>
          <div className="box">
            <label htmlFor="year" className='mb-2'>Year</label>
            <select className="form-select" id="year" name="classID" value={classID} onChange={handleChange}>
              <option value="">Select School</option>
              <option value="2021A">2021A</option>
              <option value="2021B">2021B</option>
              <option value="2022A">2022A</option>
              <option value="2022B">2022B</option>
              <option value="2023A">2023A</option>
              <option value="2023B">2023B</option>
            </select>
          </div>
        </div>
        <div className="col-sm-12" style={{alignItems:'center', justifyContent:'center',display:'flex', marginLeft:'6px', marginTop:'24px' }}>
            <button className='btn btn-danger' onClick={takeAttendance}>Take Attendance</button>
        </div>
      </div>

      <div className="row" style={{display: takingAttendance ? 'flex' : 'none' }}>
        <h2 style={{marginTop:'24px',fontWeight:'700'}}>Scan To Take Attendance</h2>
        <div className="col-sm-3" style={{display:'flex', alignItems:'center', gap:'32px'}}>
          <div>
            {(qrCodeData) && (
              <img src={qrCodeData} alt="QR Code" />
            )}
          </div>
          <div>
              {qrCodeData && (
              <div style={{display:'flex', flexDirection:'column',gap:'24px'}}>
                <input type="text" name="otp" value={otp} onChange={handleChange} placeholder="Enter OTP" />
                <button className='btn btn-primary' onClick={submitOtp}>Submit OTP</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance;
