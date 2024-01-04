//Express
const express = require("express");
const app = express();

//Listening Port
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Listening the port at ${port}`);
});
