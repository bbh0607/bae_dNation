const express = require("express");
const app = express();

// // Middlewares
// app.use("/posts", () => {
//   console.log("middleware running");
// });

// Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

app.get("/posts", (req, res) => {
  res.send("We are on posts");
});

// Connect to DB


// Listening
app.listen(3000, () => console.log("listening on port 3000..."));
