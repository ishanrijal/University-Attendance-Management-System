import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QrCode = () => {
  // State to store the QR code data
  const [moduleCode, setModuleCode] = useState('');
  const [classID, setClassID] = useState('');
  const [school, setSchool] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [missingValue, setMissingValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [userInfo, setUserInfo] = useState( JSON.parse( localStorage.getItem('data') ) );  
  const [data, setData] = useState( {} );
  const [teacherID, setTeacherID] = useState('');

  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [qrCodeSession, setQrCodeSession] = useState(localStorage.getItem('qrCodeData'));
  const [qrCodeOTP, setQrCodeOTP] = useState(localStorage.getItem('attendanceOTP'));

  const [moduleList, setModuleList] = useState( JSON.parse(localStorage.getItem('moduleList')) );

  useEffect(() => {
    setData(userInfo.user);
    if(data.role=='teacher'){
      setTeacherID(data.regNumber);
    }
  },[teacherID, data]);

  useEffect(() => {
    const storedQRCodeData = localStorage.getItem('qrCodeData');
    const qrCode = localStorage.getItem('attendanceOTP')
    if (attendanceStatus == 'running' ) {
      setQrCodeSession(storedQRCodeData);
      setQrCodeOTP(qrCode);
    }
}, [attendanceStatus]);

useEffect(() => {
    if(attendanceStatus=='complete'){
      localStorage.removeItem('attendanceId')
      localStorage.removeItem('qrCodeData')
      localStorage.removeItem('attendanceOTP')
      localStorage.removeItem('moduleCode')
      setElapsedTime('')
      setQrCodeSession('');
    }
  },[attendanceStatus]);

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    setMissingValue('');
    const { name, value } = e.target;
    if (name == 'moduleCode') {
      setModuleCode(value);
    } else if (name === 'classID') {
      setClassID(value);
    } else if (name === 'school') {
      setSchool(value);
    }
  };

  // Function to fetch the QR code data from the backend API
  const fetchQRCodeData = async (e) => {
    e.preventDefault();
    if( teacherID && moduleCode ){
        try {
        const response = await axios.post('http://localhost:3001/api/attendance/create-attendance', {
            params: {
            teacherID: teacherID,
            moduleCode: moduleCode,
            }
        });
        localStorage.setItem( 'qrCodeData', response.data.attendance.qrCode); // Assuming the response contains the QR code data
        localStorage.setItem( 'attendanceId', response.data.attendance._id);
        localStorage.setItem( 'moduleCode', moduleCode);
        localStorage.setItem( 'teacherId', teacherID);
        localStorage.setItem( 'attendanceOTP', response.data.attendance.otp);
        setAttendanceStatus("running");
        setStartTime(new Date()); // Set the start time
        
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        notifications.push(`Module ${moduleCode} attendance running`);
        localStorage.setItem('notifications', JSON.stringify(notifications));

        } catch (error) {
        console.error('Error fetching QR code data:', error);
        setError(error.response.data.error);
        localStorage.removeItem('attendanceId')
        localStorage.removeItem('qrCodeData')
        }
    }else{
        setMissingValue("Missing classID");
    }
  };
    // Function to remove the session data
    const removeQRCodeData = async () => {
        try {
          const requestData = {
            attendanceId: localStorage.getItem('attendanceId'),
            classId: localStorage.getItem('moduleCode'),
            teacherId: localStorage.getItem('teacherId')
          };
          const response = await axios.put('http://localhost:3001/api/attendance/close-attendance', requestData);
            setMessage(response.data.message);
            setAttendanceStatus(response.data.attendance.status)

            let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
            notifications.push(`Module ${localStorage.getItem('moduleCode')} attendance completed successfully.`);
            localStorage.setItem('notifications', JSON.stringify(notifications));
        } catch (error) {
            console.error('Error removing session:', error);
            setError(error.response.data.error);
        }
    };

  // Function to format elapsed time
  const formatElapsedTime = (elapsedTime) => {
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    return { minutes, seconds };
  };
  useEffect(() => {
    const timer = setTimeout(() => {
        if (startTime) {
            const now = new Date();
            const elapsed = now.getTime() - startTime.getTime();
            setElapsedTime(elapsed);
        }
    }, 1000);
    // Clear the timer when the component unmounts
   // return () => clearTimeout(timer);
    }, [startTime, elapsedTime]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12'>
          <h1 style={{marginLeft:'-40px',fontWeight:'700',padding:'24px 0'}} className='mb-2'>Take Attendance</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-4'>
          <div className="box">
              <label htmlFor="moduleCode" className='mb-2'>Modules</label>
              <select className="form-select" id="moduleCode" name="moduleCode" value={moduleCode} onChange={handleChange}>
                {moduleList && moduleList.map(module => (
                  <option key={module.classCode} value={module.classCode}>{module.name}</option>
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
      </div>
        <div style={{display: missingValue ? 'flex' : 'none' } }>
            {missingValue && (
            <p className='text-danger'>{missingValue}</p>
            )}
        </div>

        <div className='row'>
          <div className='col-sm-4' style={{ display: qrCodeSession ? 'flex' : 'none',flexDirection:'column' }}>
            {qrCodeSession && (
              <img src={`${qrCodeSession}`} alt="QR Code" width={'300px'} />
            )}
          </div>
          <div className='col-sm-4 otp-container' style={{display: qrCodeSession ? 'flex' : 'none' } }>
            <h2>OTP:{qrCodeOTP}</h2>
            <div className='counter-timer'>
              {startTime && (
                    <div className='timer-container'>
                        <div className="timer-box">
                            <div className="timer-value">{formatElapsedTime(elapsedTime).minutes}</div>
                            <div className="timer-label">Minutes</div>
                        </div>
                        <div className="timer-box">
                            <div className="timer-value">{formatElapsedTime(elapsedTime).seconds}</div>
                            <div className="timer-label">Seconds</div>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
        <div className='col-sm-12' style={{marginTop:"24px"}}>
            <div className="px-2">
                <button className='btn btn-danger' onClick={fetchQRCodeData} style={{display : !qrCodeSession ? 'flex' : 'none' }}>Take Attendance</button>
          </div>
        </div>

        <div className='col-sm-12'>
            <div className="px-2">
                <button className='btn btn-danger' onClick={removeQRCodeData} style={{display : qrCodeSession ? 'flex' : 'none' }}>Stop Attendance</button>
          </div>
        </div>
    </div>
  );
};

export default QrCode;