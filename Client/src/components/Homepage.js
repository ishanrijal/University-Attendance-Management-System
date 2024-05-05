import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Header from "./Header";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/*" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Homepage;