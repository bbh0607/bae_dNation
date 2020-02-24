const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("We are on posts");
});

router.get("/additional", (req, res) => {
  res.send("We are on posts");
});

module.exports = router;
