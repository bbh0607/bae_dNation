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
mongoose
  .connect(
    "mongodb+srv://root:1229@democluster-lcndu.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    () => {
      console.log(mongoose.connection.readyState);
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Listening
app.listen(3000, () => console.log("listening on port 3000..."));
