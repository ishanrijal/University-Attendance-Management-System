const express = require("express");
const Router = express.Router();

// import all the controller here
const {otpEmail} = require("../controllers/mailController");

// Route for sending OTP email
Router.post('/sendOTP', otpEmail );

module.exports = Router;