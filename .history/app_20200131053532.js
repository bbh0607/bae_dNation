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
// process.env.DB_URI
// Connect to DB
mongoose.connect(
  "mongodb+srv://root:Dntkd1229@cluster0-ewnsv.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("connected to DB!");
    console.log(mongoose.connection.readyState);
  }
);

// Listening
app.listen(3000, () => console.log("listening on port 3000..."));
