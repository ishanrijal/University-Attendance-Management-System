const { sendEmail } = require('../mail');

const otpEmail = async function (req, res) {
    const { email } = req.body;   
    // Generate OTP
    const otp = generateOTP(); 
    
    // Store OTP in session
    req.session.email = email;
    req.session.otp = otp;
    
    const subject = "Your OTP for Email Verification"; // Email subject
    const message = `<h1>Your OTP is: ${otp}</h1>`; // Email message
  
    try {
        // Send OTP email asynchronously
        await sendEmail(email, subject, message);
        
        // If email is sent successfully, respond with success and OTP
        res.status(200).json({ success: true, otp: otp });
    } catch (error) {
        // If there's an error in sending email, respond with error message
        res.status(500).json({ success: false, error: "Failed to send OTP email" });
    }
}

function generateOTP() {
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  return otp
}

module.exports = { otpEmail };
