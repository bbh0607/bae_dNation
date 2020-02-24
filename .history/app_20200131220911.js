// Requires
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const postsRoute = require("./routes/posts");
require("dotenv/config");

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/posts", postsRoute);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "index.html"));
});

// Connect to DB
mongoose
  .set("useUnifiedTopology", true)
  .connect(process.env.DB_URI, { useNewUrlParser: true }, () => {
    console.log(mongoose.connection.readyState);
  })
  .then(() =>
    console.log("MongoDB Connected...", mongoose.connection.readyState)
  )
  .catch(err => console.log(err));

// Port config
const PORT = process.eventNames.PORT || 3000

// Listening
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
