const express = require('express')
const router = express.Router();

app.get("/posts", (req, res) => {
  res.send("We are on posts");
});
