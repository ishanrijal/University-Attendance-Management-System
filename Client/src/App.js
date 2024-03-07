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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
    <>
      <div>
        <Link to="/">Home</Link>
        <br/>
        <Link to="/login">Login</Link>
        <br/>
        <Link to="/signup">Signup</Link>
        <br/>
      </div> 
      <div>
        <Outlet />
      </div>
    </>
  );
};
