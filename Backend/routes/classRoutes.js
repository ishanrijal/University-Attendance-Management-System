// import all the controller here
const express = require('express');
const classController = require("../controllers/classController");
const router = require('express').Router()

// Route to generate QR code
router.get('/get-post', classController.getModuleList);

router.post('/register-module', classController.createModule);

//get selected modules
router.get('/get-selected-post', classController.getSelectedModuleList);

module.exports = router;