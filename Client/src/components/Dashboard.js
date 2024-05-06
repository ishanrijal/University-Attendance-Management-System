import React from "react";
import { VscFileSubmodule } from "react-icons/vsc";
import { GoGraph } from "react-icons/go";
import { VscPercentage } from "react-icons/vsc";
import { IoIosNotifications } from "react-icons/io";
import LineChart from "./LineChart";


export default function Dashboard() {
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
                  <p>140</p>
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
                  <p>140</p>
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
                  <p>80</p>
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
              <p>You have successfully created your account.</p>
              <p>Your Attendance has been recorded.</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
