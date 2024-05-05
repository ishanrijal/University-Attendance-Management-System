// Mail.js

const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send an email with OTP
function sendEmail(email, subject, message) {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS, // Gmail address
      pass: process.env.EMAIL_PASSWORD // Gmail password
    }
  });

  // Email message options
  let mailOptions = {
    from: process.env.EMAIL_ADDRESS, // Sender address
    to: email, // Recipient address
    subject: subject, // Subject line
    html: message // Email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false; // Failed to send email
    } else {
      console.log('Email sent: ' + info.response);
      return true; // Email sent successfully
    }
  });
}

module.exports = { sendEmail };
