const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

// Middlewares
app.use(bodyParser.json());
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);


// Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

// Connect to DB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, () => {
  console.log("connected to DB!");
  console.log(mongoose.connection.readyState);
  mongoose.connection.on("error", console.error.bind(console, "connection error:"));
  mongoose.connection.once("open", function() {
    console.log("connected")
  });
});

// Listening
app.listen(3000, () => console.log("listening on port 3000..."));
