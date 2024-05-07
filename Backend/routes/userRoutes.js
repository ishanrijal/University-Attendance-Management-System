const express = require("express");
const Router = express.Router();

// import all the controller here
const {register, login, getAllUsers} = require("../controllers/userController");

// user login route
Router.post("/login", login);

// user signup route
Router.post("/register", register);

Router.get("/all-users", getAllUsers);


module.exports = Router;
