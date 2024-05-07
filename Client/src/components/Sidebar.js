import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { BsFileSpreadsheet } from "react-icons/bs";
import { MdQrCodeScanner } from "react-icons/md";
import { MdOutlineCoPresent } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { MdViewModule } from "react-icons/md";


const Sidebar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState( JSON.parse( localStorage.getItem('data') ) );
  const [data, setData] = useState( {} );
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    setData(userInfo.user);
    if(data.role=='teacher'){
      setIsTeacher(true);
    }
    if(data.role=='student'){
      setIsTeacher(false);
    }
  },[userInfo,data]);

  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  }
  return (
      <div class="sidebar d-flex flex-column flex-shrink-0 bg-light">
        <Link to="/" class="sidebar-heading d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <span class="fs-4">Attendify</span>
        </Link>
        <hr/>
        <ul class="nav nav-pills flex-column mb-auto sidebar-navigation">

          <li style={{display : ! isTeacher ? 'flex' : 'none'  }}>
            <RxDashboard />
            <Link class="nav-link link-dark" to="/student">Dashboard</Link>
          </li>

           <li style={{display : isTeacher ? 'flex' : 'none'  }}>
            <RxDashboard />
            <Link class="nav-link link-dark" to="/teacher">Dashboard</Link>
          </li>

          <li style={{display : isTeacher ? 'flex' : 'none'  }}>
            <BsFileSpreadsheet />
            <Link class="nav-link link-dark" to="/teacher/attendance-sheet">Attendance Sheet</Link>
          </li>
          <li style={{display : ! isTeacher ? 'flex' : 'none'  }}>
            <MdOutlineCoPresent />
            <Link class="nav-link link-dark" to="/student/attendance">Take Attendance</Link>
          </li>
          <li style={{display : isTeacher ? 'flex' : 'none'  }} >
            <MdQrCodeScanner />
            <Link class="nav-link link-dark" to="/teacher/generate-qrscanner">Generate QR</Link>
          </li>
          <li style={{display : isTeacher ? 'flex' : 'none'  }} >
            <MdViewModule />
            <Link class="nav-link link-dark" to="/teacher/create-class">Create Class</Link>
          </li>
          <li style={{display : ! isTeacher ? 'flex' : 'none'  }}>
            <TbReportSearch />
            <Link class="nav-link link-dark" to="/student/report">Report</Link>
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
