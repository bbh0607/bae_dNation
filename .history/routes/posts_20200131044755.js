const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

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
  post
    .save()
    .then(data => {
      res.json(data);
      console.log('data processed');
    })
    .catch(e => {
      res.json({ message: e });
      console.log("data processed");
    });
});
module.exports = router;
