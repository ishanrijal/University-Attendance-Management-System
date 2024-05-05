const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
// import all the routes here
const userRoutes = require( './routes/userRoutes' );
const classRoutes = require('./routes/classRoutes');
const mailRoutes = require( './routes/mailRoutes' );  // Route to send the OTP Email
const optVerifyRoutes = require( './routes/optVerifyRoutes' );  // Route to verify the OTP
const attendanceRoutes = require( './routes/attendanceRoutes' );  // Route to verify the OTP

// Enable Cors 
app.use(cors());

// Parse JSON request
app.use(bodyParser.json());

// Set up session middleware

// Set up session middleware with MongoDB store
app.use(session({
  secret: 'a048cede314a5295d3f83f9d8b34c8e375aa7c68ae29de3ffa5908e425719bf0',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: 'attendance-system' // database name
  })
}));

//Listening Port
const port = process.env.PORT || 3001;

//Connecting to the mongodb
mongoose.connect(process.env.MONGO_URI)
.then((con)=>{
  console.log("Connected Successfully to the Database...",con.connection.host);
  //After Successfully connected to DB, running the Node App
  app.listen(port, () => {
    console.log(`Listening the port at ${port}`);
  });
})
.catch(error=>console.log("Connection Failed",error));



// use all the routes here
app.use( '/api/user', userRoutes);
app.use('/api/class', classRoutes);
app.use( '/api/email', mailRoutes);
app.use( '/api/attendance', attendanceRoutes);


app.get("/", (req, res) => {
  res.send("NODE Server is running...");
});