import React from "react";
import {
  Link,
} from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

export default function ProfileHeader() {
  return (
    <header className="d-flex flex-column flex-shrink-0 bg-light container-fluid" style={{height:'80px',justifyContent:'center',alignItems:'center'}}>
      <div className="row">
        <div className="col-sm-12 profile-header">
          <FaRegUserCircle />
          <Link to="/login" className="nav-link">Ishan Rijal</Link>
        </div>
      </div>
    </header>
  );
}