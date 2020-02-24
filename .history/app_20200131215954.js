const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("dotenv/config");

// Middlewares
app.use(bodyParser.json());
app.use(cors());
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "index.html"));
});

// Connect to DB
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true }, () => {
    console.log(mongoose.connection.readyState);
  })
  .then(() =>
    console.log("MongoDB Connected...", mongoose.connection.readyState)
  )
  .catch(err => console.log(err));

// Listening
app.listen(3000, () => console.log("listening on port 3000..."));
