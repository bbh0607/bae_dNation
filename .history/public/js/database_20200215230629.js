const mongoose = require("mongoose");

mongoose
  .set("useUnifiedTopology", true)
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() =>
    console.log(
      `MongoDB Connected with readyState ${mongoose.connection.readyState}`
    )
  )
  .catch(err => console.log(err));
// const firebase = require("firebase/app");
// require('firebase/firestore')
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