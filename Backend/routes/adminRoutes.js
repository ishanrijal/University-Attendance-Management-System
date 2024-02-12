const express = require("express");
const Router = express.Router();

//Import all the controller here
const userController = require("../controllers/userController");



//Admin Login Route
Router.get( "/admin-login", userController.adminLogin );

// //Admin Login, post request
// router.post("/login", userController.userLogin);

module.exports = Router;
