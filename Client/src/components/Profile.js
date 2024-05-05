// Profile.js
import React from "react";
import {
  Outlet,
  Link
} from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";

function Profile() {
return(
  <>
    <ProfileHeader/>
    <div className="row">
      <div className="col-sm-3">
        <Sidebar />
      </div>
      <div className="col-sm-9">
        <Outlet/>
      </div>
    </div>
  </>
);
}

export default Profile;
