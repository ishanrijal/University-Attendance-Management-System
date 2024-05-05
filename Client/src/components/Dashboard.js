import React, { useState } from "react";
import Header from "./Header";
// import { Link, useHistory } from "react-router-dom";
// import axios from "axios";

export default function Dashboard() {
  const [role, setRole]         = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <div className="container">
        <div className="row custom-row">
          <div className="col-sm-6">
            <h1>Dashboard</h1>
          </div>
          <div className="col-sm-6">
            Welcome
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h2>TOTAL CLASSROOMS</h2>
          </div>
          <div className="col-sm-4">
            TOTAL LECTURES ATTENDED
          </div>
          <div className="col-sm-4">
            ABSENT COUNT
          </div>
          <div className="col-sm-4">
            ATTENDANCE PERCENTAGE
          </div>
        </div>
      </div>
    </div>
  );
}
