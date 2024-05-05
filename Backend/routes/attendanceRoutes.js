// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Route to generate QR code
router.get('/generate-qr', attendanceController.generateQR);

// Route to remove QR session data
router.delete('/remove-session/:moduleCode/:classId', attendanceController.removeSession);


// teacher 
router.post('/create-attendance', attendanceController.createAttendance); 
router.put('/close-attendance', attendanceController.closeAttendance); 


// my -> student
router.post('/get-my-qr', attendanceController.getMyQR);
router.put('/update-my-attendance', attendanceController.updateMyAttendance);

module.exports = router;
