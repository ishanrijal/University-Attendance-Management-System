import React, { useEffect, useState } from "react";
import { VscFileSubmodule } from "react-icons/vsc";
import { GoGraph } from "react-icons/go";
import { VscPercentage } from "react-icons/vsc";
import { IoIosNotifications } from "react-icons/io";
import LineChart from "./LineChart";


export default function Dashboard() {
  const [data, setData]= useState(localStorage.getItem('attendanceInformation'));
  const [message, setMessage]= useState(localStorage.getItem('message'));

  useState(()=>{  
    const info =JSON.parse(localStorage.getItem('attendanceInformation'))
    setData(info);
  },[data])

  return (
    <div className="login-page">
      <div className="container">
        <div className="row">
          <div className="col-sm-4" style={{height:'200px',padding:'10px'}}>
            <div class="card" style={{width: "18rem"}}>
              <div class="card-body">
                <h5 class="card-title">Total Lecture</h5>
                <h6 class="card-subtitle mb-2 text-muted">Attended</h6>
                <div className="card-icon">
                  <p>
                  <VscFileSubmodule />
                  </p>
                  <p>{data && (data.length) ? data.length : 6 }</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4" style={{height:'200px',padding:'10px'}}>
            <div class="card" style={{width: "18rem"}}>
              <div class="card-body">
                <h5 class="card-title">Absent Count</h5>
                <h6 class="card-subtitle mb-2 text-muted">Count</h6>
                <div className="card-icon">
                  <p>
                  <GoGraph />
                  </p>
                  <p>5</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4" style={{height:'200px',padding:'10px'}}>
            <div class="card" style={{width: "18rem"}}>
              <div class="card-body">
                <h5 class="card-title">Precentage</h5>
                <h6 class="card-subtitle mb-2 text-muted">List</h6>
                <div className="card-icon">
                  <p>
                    <VscPercentage />
                  </p>
                  <p>{((6 - 5) / 6 * 100).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{marginTop:'48px'}}>
        <div className="row">
          <div className="col-sm-7 graph-container">
            <LineChart />
          </div>
          <div className="col-sm-1">
          </div>
          <div className="col-sm-4 notification-container">
            <div className="card">
            <h2>
            <IoIosNotifications />
            <p>Notification</p>
            </h2>
            <div className="notification-content">
              <p>{ message && message }</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
