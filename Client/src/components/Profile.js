// Profile.js
import React,{ useEffect, useState } from "react";
import {
  Outlet,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import { useLocation } from "react-router-dom";



function Profile() {
  const location = useLocation();
  const [userInfo, setUserInfo]= useState({});

  useEffect(() => {
    // Access email from location state
    if (location.state && location.state.user) {
      const obj = location.state.user;
      setUserInfo(obj); // Directly set userInfo to the object
    }
  },[location.state]);
return(
  <>
    <div className="row" style={{margin:0}}>
      <div className="col-sm-2" style={{padding:'0'}}>
        <Sidebar />
      </div>
      <div className="col-sm-10" style={{padding:'0'}}>
        <ProfileHeader />
        <div className="container outlet-container">
          <div className="row">
            <div className="col-sm-12">
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default Profile;
