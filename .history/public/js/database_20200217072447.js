function initFirestore(map) {
  //   console.log("AAA", coordinates);
  var firebaseConfig = {
    apiKey: "AIzaSyCNg9f1hBieClZtldbdxtM5oK-Aanx6ZCE",
    authDomain: "travel-dnation-kangws.firebaseapp.com",
    databaseURL: "https://travel-dnation-kangws.firebaseio.com",
    projectId: "travel-dnation-kangws",
    storageBucket: "travel-dnation-kangws.appspot.com",
    messagingSenderId: "378843992848",
    appId: "1:378843992848:web:505e12451c413f1e164b95",
    measurementId: "G-NFY4VHW9XP"
  };
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
  displayFlags(db, map);
  ekspresTime(db);
}

function displayFlags(db, map) {
  db.collection("scenes")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.id, "=>", doc.data().location);
        let image = doc.data().scene_image;
        let coords = doc.data().location;
        let marker = new google.maps.Marker({
          position: { lat: coords._lat, lng: coords._long },
          map: map,
          icon: image
        });
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}

function ekspresTime(db) {}
