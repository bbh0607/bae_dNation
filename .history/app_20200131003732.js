const express = require("express");
const app = express();
require("dotenv/config");

// // Middlewares
// app.use("/posts", () => {
//   console.log("middleware running");
// });

// Routes
app.get("/", (req, res) => {
  res.send("We are on home");
});

app.get("/posts", (req, res) => {
  res.send("We are on posts");
});

// Connect to DB
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("connected to DB!");
  client.close();
});

// Listening
app.listen(3000, () => console.log("listening on port 3000..."));
