const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//Admin Login, post request
router.post("/login", userController.userLogin);

module.exports = router;