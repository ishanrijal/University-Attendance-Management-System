import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/profile">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile/attendance-sheet">Attendance Sheet</Link>
        </li>
        <li>
          <Link to="/profile/attendance">Take Attendance</Link>
        </li>
        <li>
          <Link to="/profile/generate-qrscanner">Generate QR</Link>
        </li>
        <li>
          <Link to="/profile/profile/report">Report</Link>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
