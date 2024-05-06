import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { BsFileSpreadsheet } from "react-icons/bs";
import { MdQrCodeScanner } from "react-icons/md";
import { MdOutlineCoPresent } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";


const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () =>{
    navigate('/', { replace: true });
  }
  return (
      <div class="sidebar d-flex flex-column flex-shrink-0 bg-light">
        <Link to="/" class="sidebar-heading d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <span class="fs-4">Attendify</span>
        </Link>
        <hr/>
        <ul class="nav nav-pills flex-column mb-auto sidebar-navigation">
          <li>
            <RxDashboard />
            <Link class="nav-link link-dark" to="/profile">Dashboard</Link>
          </li>
          <li>
            <BsFileSpreadsheet />
            <Link class="nav-link link-dark" to="/profile/attendance-sheet">Attendance Sheet</Link>
          </li>
          <li>
          <MdOutlineCoPresent />
            <Link class="nav-link link-dark" to="/profile/attendance">Take Attendance</Link>
          </li>
          <li>
            <MdQrCodeScanner />
            <Link class="nav-link link-dark" to="/profile/generate-qrscanner">Generate QR</Link>
          </li>
          <li>
            <TbReportSearch />
            <Link class="nav-link link-dark" to="/profile/profile/report">Report</Link>
          </li>
          <li>
            <TbLogout2 />
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
  );
};

export default Sidebar;
