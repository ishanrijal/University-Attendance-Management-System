// Route to verify OTP

const express = require('express');
const Router = express.Router();
const otpController = require('../controllers/optVerifyController');

// Route for verifying OTP
Router.post('/verifyOTP', otpController.verifyOTP);

module.exports = Router;
