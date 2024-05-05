import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

export default function Footer() {
  return (
    <footer className="container-fluid">
      <div className="row custom-row">
        <div className="col-sm-4">
            <p>@Copyright 2024 </p>
        </div>
        <div className="col-sm-8">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 footer-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link" >Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login"  className="nav-link" >Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/verify-email"  className="nav-link" >Student Registration</Link>
                </li>
            </ul>
        </div>
      </div>
    </footer>
  );
}
