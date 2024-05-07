import React,{ useEffect, useState } from "react";
import {
  Link,
} from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

export default function ProfileHeader( ) {
  const [user, setUser]= useState(JSON.parse(localStorage.getItem('data')).user);

  return (
    <header className="d-flex flex-column flex-shrink-0 bg-light container-fluid" style={{height:'80px',justifyContent:'center',alignItems:'center'}}>
      <div className="row">
        <div className="col-sm-12 profile-header">
          <div className="profile-name">
            <p>
              <span><FaRegUserCircle /></span>
              <span>{ user && `${user.firstName} ${user.lastName}`}</span>
            </p>
            <p> { user && `${user.role}`}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
