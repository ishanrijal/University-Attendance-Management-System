// Dotenvt file configuation
require('dotenv').config();
//Express
const express = require("express");
const mongoose = require('mongoose');

const app = express();
//Listening Port
const port = process.env.PORT || 3001;

//Connecting to the mongodb
mongoose.connect(process.env.MONGO_URI)

.then(()=>console.log("Connected Successfully to the DB"))
.catch(error=>console.log("Connection Failed",error));

// import all the routes here
const adminRoute = require( './routes/adminRoutes' );

//Use all the routes here
app.use(adminRoute);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  console.log(`Listening the port at ${port}`);
});
