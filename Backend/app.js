//Express
const express = require("express");
const mongoose = require('mongoose');

const app = express();
//Listening Port
const port = process.env.port || 3005;

const DB='mongodb+srv://ishanrijal:oJalc4J6CiJeb5si@cluster0.xysejxc.mongodb.net/?retryWrites=true&w=majority'

//Connecting to the mongodb
mongoose.connect(DB)
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
