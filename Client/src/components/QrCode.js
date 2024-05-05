import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QrCode = () => {
  // State to store the QR code data
  const [qrCodeData, setQRCodeData] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [classID, setClassID] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [missingValue, setMissingValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    setMissingValue('');
    const { name, value } = e.target;
    if (name === 'moduleCode') {
      setModuleCode(value);
    } else if (name === 'classID') {
      setClassID(value);
    } else if (name === 'subject') {
      setSubject(value);
    }
  };

  // Function to fetch the QR code data from the backend API
  const fetchQRCodeData = async () => {
    if( moduleCode && classID ){
        try {
        const response = await axios.get('http://localhost:3001/api/attendance/generate-qr', {
            params: {
            moduleCode: moduleCode,
            classId: classID,
            // Add more parameters as needed
            }
        });
        setQRCodeData(response.data.qrCode); // Assuming the response contains the QR code data
        setMessage(response.data.message); // Storing the message from the server
        setStartTime(new Date()); // Set the start time
        } catch (error) {
        console.error('Error fetching QR code data:', error);
        setError(error.response.data.error);
        setQRCodeData('');
        }
    }else{
        setMissingValue("Missing modulecode or classID");
    }
  };

    // Function to remove the session data
    const removeQRCodeData = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/attendance/remove-session/${moduleCode}/${classID}`);
            setMessage('Session removed successfully');
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
    return () => clearTimeout(timer);
    }, [startTime, elapsedTime]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12'>
          <h1>Take Attendance</h1>
        </div>
        <div style={{display: missingValue ? 'flex' : 'none' } } >
            {missingValue && (
            <p>{missingValue}</p>
            )}
        </div>
        <div className='col-sm-12 attendance-box-container'>
          <div className="box">
            <label htmlFor="subject">Subject</label>
            <select id="subject" name="subject" value={subject} onChange={handleChange}>
              <option value="3031">Subject 1</option>
              <option value="3032">Subject 2</option>
            </select>
          </div>

          <div className="box">
            <label htmlFor="faculty">Faculty</label>
            <select id="faculty" name="moduleCode" value={moduleCode} onChange={handleChange}>
              <option value="111">Computing & IT</option>
              <option value="112">Finance</option>
            </select>
          </div>

          <div className="box">
            <label htmlFor="year">Year</label>
            <select id="year" name="classID" value={classID} onChange={handleChange}>
              <option value="2021A">2021A</option>
              <option value="2021B">2021B</option>
            </select>
          </div>

          <div className="box">
            <button onClick={fetchQRCodeData}>Generate QR</button>
          </div>
        </div>

        <div className='col-sm-12 counter-timer' style={{display: message ? 'flex' : 'none' } }>
            <div>
                {message && (
                <p>{message}</p>
                )}
            </div>

            <div>
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

        <div className='col-sm-12' style={{ display: qrCodeData ? 'flex' : 'none' }}>
          <h2>Scan the QR Code</h2>
          {qrCodeData && (
            <img src={`${qrCodeData}`} alt="QR Code" />
          )}
        </div>
        <div className='col-sm-12'>
            <div className="box-">
                <button onClick={removeQRCodeData}>Stop QR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;