import React, {useState, useEffect} from "react";
import axios from "axios";

function Attendance() {
    const [qrCodeData, setQRCodeData] = useState('');

    // Function to fetch the QR code data from the backend API
    const fetchQRCodeData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/attendance/generate-qr');
        setQRCodeData(response.data.qrCode); // Assuming the response contains the QR code data
      } catch (error) {
        console.error('Error fetching QR code data:', error);
      }
    };
  
    // Fetch the QR code data when the component mounts
    useEffect(() => {
      fetchQRCodeData();
    }, []);

  return (
    <div>
      <h1>Attendance</h1>
      {qrCodeData && (
        <img src={`${qrCodeData}`} alt="QR Code" />
      )}
    </div>
  );
}

export default Attendance;

