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
// Get Attendance List 
router.get('/student-attendance-history', attendanceController.getStudentAttendanceList);


// my -> student
router.post('/get-my-qr', attendanceController.getMyQR);
router.get('/get-generated-qr', attendanceController.getGeneratedQR);
router.put('/update-my-attendance', attendanceController.updateMyAttendance);

// Get Attendance List 
router.get('/get-my-attendance', attendanceController.getMyAttendanceList);

module.exports = router;
