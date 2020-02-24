const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error); // mongoDB 연동 실패 시 에러 메시지 출력
db.once("open", () => {
  console.log("connected to mongoDB server"); // mongoDB 연동 성공 시 메시지 출력
});

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