// Requires
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");   
require("dotenv/config");

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))

// Connect to DB (mongoDB)
mongoose
  .set("useUnifiedTopology", true)
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() =>
    console.log(
      `MongoDB Connected with readyState ${mongoose.connection.readyState}`
    )
  )
  .catch(err => console.log(err));

let db = mongoose.connection;
db.getCollection()
// Port config
const PORT = process.eventNames.PORT || 3000;

// Listening
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
