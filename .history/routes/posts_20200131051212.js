const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("We are on posts");
});

router.get("/additional", (req, res) => {
  res.send("We are on posts/additional");
});

router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });
  console.log(mongoose.connection.readyState);
  post
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.json({ message: e });
    });
});
module.exports = router;
