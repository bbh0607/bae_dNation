// Requires
const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// const firebase = require("firebase")
require("dotenv/config");

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// // Connect to Firebase Firestore Database with provided config
// var firebaseConfig = {
//   apiKey: "AIzaSyCNg9f1hBieClZtldbdxtM5oK-Aanx6ZCE",
//   authDomain: "travel-dnation-kangws.firebaseapp.com",
//   databaseURL: "https://travel-dnation-kangws.firebaseio.com",
//   projectId: "travel-dnation-kangws",
//   storageBucket: "travel-dnation-kangws.appspot.com",
//   messagingSenderId: "378843992848",
//   appId: "1:378843992848:web:505e12451c413f1e164b95",
//   measurementId: "G-NFY4VHW9XP"
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// var db = firebase
//   .firestore()
//   .collection("videos")
//   .get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       console.log(doc.id, "=>", doc.data());
//     });
//   })
//   .catch(err => {
//     console.log("Error getting documents", err);
//   });
module.exports=db;
// Port config
const PORT = process.env.PORT || 3000;

// Listening
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
