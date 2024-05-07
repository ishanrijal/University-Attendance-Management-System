import React, { useState, useEffect, useRef } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const Report = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const getMyAttendanceList = async () => {
    try {
        const studentId = JSON.parse(localStorage.getItem('data')).user._id
        const response = await axios.get(`http://localhost:3001/api/attendance/get-my-attendance?studentId=${studentId}`);
        setData(response.data.records);
        localStorage.setItem( 'attendanceInformation',JSON.stringify( response.data.records ) );
    } catch (error) {
      console.error('Error getting course data:', error);
    }
  };
  useEffect(()=>{
      getMyAttendanceList()
  },[])

  const fetchCourseList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/class/get-post');
      setCourseData(response.data);
    } catch (error) {
      console.error('Error getting course data:', error);
    }
  };
  useEffect(() => {
    fetchCourseList();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const table = tableRef.current;
    const rows = table.querySelectorAll('tr');

    const header = [];
    const dataRows = [];

    // Extract headers
    rows[0].querySelectorAll('th').forEach((headerCell) => {
      header.push(headerCell.textContent.trim());
    });

    // Extract data rows
    for (let i = 1; i < rows.length; i++) {
      const dataRow = [];
      rows[i].querySelectorAll('td').forEach((dataCell) => {
        dataRow.push(dataCell.textContent.trim());
      });
      dataRows.push(dataRow);
    }

    // Add headers and rows to PDF
    doc.text('Attendance Sheet', 40, 40);
    doc.autoTable({ startY: 60, head: [header], body: dataRows });

    // Save PDF
    doc.save('attendance_sheet.pdf');
  };

  return (
    <div className="container">
      <h2 className="mb-4">Attendance Sheet</h2>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-bordered attendance-table" ref={tableRef}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Class Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((info, index) => (
                <tr key={index}>
                  <td>{info.date.slice(0, 10)}</td>
                  <td>
                    {courseData
                      .filter(course => course._id === info.classId)
                      .map(course => course.name)
                      .join(', ')
                    }
                  </td>
                  <td>{info.students.map(student => student.status).join(',')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={downloadPDF}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;