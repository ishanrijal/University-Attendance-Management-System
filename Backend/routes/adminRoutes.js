const express = require("express");
const Router = express.Router();
//Import all the controller here
const {register} = require("../controllers/userController");

//Register User
Router.post("/register", register);

//Admin Login Route
//Router.get( "/admin-login", userController.adminLogin );

// //Admin Login, post request
// router.post("/login", userController.userLogin);

module.exports = Router;
