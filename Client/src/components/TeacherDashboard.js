import React, { useEffect, useState } from "react";
import { VscFileSubmodule } from "react-icons/vsc";
import { GoGraph } from "react-icons/go";
import { MdFormatListNumbered } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaCrown } from "react-icons/fa6";
import axios from "axios";


export default function TeacherDashboard() {  
  const [data, setData]= useState('');
  const [moduleCount, setModuleCount]= useState(0);
  const [message, setMessage]= useState(localStorage.getItem('message'));
  const [attendanceData, setAttendanceData]= useState(JSON.parse(localStorage.getItem('attendanceInformation')));
  const [notification, setNotification]= useState(JSON.parse(localStorage.getItem('notifications')));

  const fetchCourseList = async () => {
    try {
      const teacherId = JSON.parse(localStorage.getItem('data')).user._id
      const response = await axios.get('http://localhost:3001/api/class/get-post');

      const count = response.data.filter(list => list.owner === teacherId).length;
      setModuleCount(count);
      localStorage.setItem( 'moduleList', JSON.stringify( response.data ) )
    } catch (error) {
      console.error('Error getting course data:', error);
    }
  };
  useEffect(() => {
    fetchCourseList();
  }, []);

  const getTotalStudentCount = (attendanceData) => {
    let totalStudents = 0;
    attendanceData && attendanceData.forEach(attendance => {
      totalStudents += attendance.students.length;
    });
    return totalStudents;
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-sm-4" style={{height:'200px',padding:'10px'}}>
            <div class="card" style={{width: "18rem"}}>
              <div class="card-body">
                <h5 class="card-title">Total Session</h5>
                <h6 class="card-subtitle mb-2 text-muted">Count</h6>
                <div className="card-icon">
                  <p>
                  <VscFileSubmodule />
                  </p>
                  <p>{attendanceData && attendanceData.length }</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4" style={{height:'200px',padding:'10px'}}>
            <div class="card" style={{width: "18rem"}}>
              <div class="card-body">
                <h5 class="card-title">Student Count</h5>
                <h6 class="card-subtitle mb-2 text-muted">Students</h6>
                <div className="card-icon">
                  <p>
                  <GoGraph />
                  </p>
                  <p>
                    { getTotalStudentCount(attendanceData) + 12}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4" style={{height:'200px',padding:'10px'}}>
            <div class="card" style={{width: "18rem"}}>
              <div class="card-body">
                <h5 class="card-title">Issues</h5>
                <h6 class="card-subtitle mb-2 text-muted">Complains</h6>
                <div className="card-icon">
                  <p>
                    <MdFormatListNumbered />
                  </p>
                  <p>{0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{marginTop:'48px'}}>
        <div className="row">
          <div className="col-sm-4 graph-container">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                  <h5 class="card-title">Module Owner</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Name</h6>
                  <div className="card-icon">
                    <p>
                      <FaCrown />
                    </p>
                    <p>{ moduleCount && moduleCount }</p>
                  </div>
                </div>
              </div>            
          </div>
          <div className="col-sm-7 notification-container" style={{padding:0,marginBottom:'80px'}}>
            <div className="card" style={{width:'100%'}}>
              <h2>
                <IoIosNotifications />
                <p>Notification</p>
              </h2>
              <div className="notification-content">
                <p>{ message && message }</p>
                {
                  notification && notification.map((item, index) => (
                    <p className="notification-text" key={index}>{item}</p>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}