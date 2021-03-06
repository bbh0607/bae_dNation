function initFirestore(map) {
  console.log("AAA", coordinates);
  var image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

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
  var db = firebase.firestore();
  db.collection("scenes")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data().location);
        var coords = doc.data().location;
        var beachMarker = new google.maps.Marker({
          position: { lat: coords._lat, lng: coords._long },
          map: map,
          icon: image
        });
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
    db.collection("timetable")
      .doc("1")
      .set({
        stationName: "KLIA2",
        left: [
          10,
          35,
          110,
          530,
          550,
          610,
          630,
          645,
          700,
          715,
          730,
          745,
          800,
          815,
          830,
          845,
          900,
          915,
          930,
          950,
          1010,
          1030,
          1050,
          1110,
          1130,
          1150,
          1210,
          1230,
          1250,
          1310,
          1330,
          1350,
          1410,
          1430,
          1450,
          1510,
          1530,
          1550,
          1610,
          1630,
          1645,
          1700,
          1715,
          1730,
          1745,
          1800,
          1815,
          1830,
          1845,
          1900,
          1915,
          1930,
          1945,
          2000,
          2015,
          2030,
          2045,
          2100,
          2115,
          2130,
          2145,
          2200,
          2215,
          2230,
          2250,
          2310,
          2330,
          2350
        ],
        right: [null
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
}
