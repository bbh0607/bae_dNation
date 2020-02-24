const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Get all posts
router.get("/", async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts)
    }catch(e){
        res.json({ message: e});
    }
});

// Get specific post
router.get("/:postID", (req, res) => {
    Post.findById(req.params)
})

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
    })
    .catch(e => {
      res.json({ message: e });
    });
});
module.exports = router;
