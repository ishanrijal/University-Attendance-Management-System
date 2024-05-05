// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Route to generate QR code
router.get('/generate-qr', attendanceController.generateQR);

// Route to remove QR session data
router.delete('/remove-session/:moduleCode/:classId', attendanceController.removeSession);


module.exports = router;
