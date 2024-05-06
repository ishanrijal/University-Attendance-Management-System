import React from "react";
import "./assets/css/style.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import EmailVerification from "./components/EmailVerification";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Report from "./components/Report";
import Attendance from "./components/Attendance";
import QrCode from "./components/QrCode";
import AttendanceSheet from "./components/AttendanceSheet";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/*" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="verify-email" element={<EmailVerification />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/profile/*" element={<Profile />} >
          <Route index element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendance-sheet" element={<AttendanceSheet />} />
          <Route path="generate-qrscanner" element={<QrCode />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

const Root = () => {
  return (
    <main className="main-con">
    <Header/>
      <Outlet />
    <Footer/>
    </main>
  );
};