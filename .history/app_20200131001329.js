const express = require("express");
const app = express();


// Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

app.get("/posts", (req, res) => {
  res.send("We are on posts");
});

// Listening
app.listen(3000, () => console.log("listening on port 3000..."));
