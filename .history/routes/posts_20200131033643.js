const express = require("express");
const router = express.Router();
const Post = require('../models/Post')


router.get("/", (req, res) => {
  res.send("We are on posts");
});

router.get("/additional", (req, res) => {
  res.send("We are on posts/additional");
});

router.post("/", )
module.exports = router;
