// Profile.js
import React from "react";
import {
  Outlet,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";

function Profile() {
return(
  <>
    <div className="row" style={{margin:0}}>
      <div className="col-sm-2" style={{padding:'0'}}>
        <Sidebar />
      </div>
      <div className="col-sm-10" style={{padding:'0'}}>
        <ProfileHeader/>
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
