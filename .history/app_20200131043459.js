const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require("dotenv/config");

// Middlewares
app.use(bodyParser.json());
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);


// Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

// app.get("/posts", (req, res) => {
//   res.send("We are on posts");
// });

// Connect to DB
mongoose.connect()

// Listening
app.listen(3000, () => console.log("listening on port 3000..."));
