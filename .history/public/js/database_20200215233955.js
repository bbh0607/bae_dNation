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

const mongoose = require("mongoose");
console.log(mongoose);
// mongoose.connect("mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
const connection = mongoose.createConnection(process.env.DB_URI);
autoIncrement.initialize(connection);