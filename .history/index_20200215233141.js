// Requires
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
// const firebase = require("firebase")
require("dotenv/config");

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Port config
const PORT = process.env.PORT || 3000;

// Listening
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
