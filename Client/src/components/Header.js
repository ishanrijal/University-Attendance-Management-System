import React, { useState } from "react";
import {
  Link,
} from "react-router-dom";

export default function Header() {
  return (
    <header className="header container-fluid">
      <div className="row custom-row">
        <div className="col-sm-8">
          <nav className="navbar navbar-expand-lg">
            <h2 className="navbar-brand">Attendify</h2>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link" >Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login"  className="nav-link" >Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/verify-email"  className="nav-link" >Registration</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
