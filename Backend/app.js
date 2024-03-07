const express = require("express");
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Enable Cors 
app.use(cors());

// Parse JSON request
app.use(bodyParser.json());
//Listening Port
const port = process.env.PORT || 3001;

//Connecting to the mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Connected Successfully to the Database...");
  //After Successfully connected to DB, running the Node App
  app.listen(port, () => {
    console.log(`Listening the port at ${port}`);
  });
})
.catch(error=>console.log("Connection Failed",error));

// import all the routes here
const adminRoute = require( './routes/adminRoutes' );

//Use all the routes here
app.use(adminRoute);


app.get("/", (req, res) => {
  res.send("NODE Server is running...");
});


