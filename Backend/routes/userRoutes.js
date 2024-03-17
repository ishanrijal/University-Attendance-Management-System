const express = require("express");
const Router = express.Router();

// import all the controller here
const {register, login} = require("../controllers/userController");

// user login route
Router.post("/login", login);

// user signup route
Router.post("/register", register);


module.exports = Router;
