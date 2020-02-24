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
      .doc("0")
      .set({
        stationName: "KLIA2",
        left: null,
        right: [
          25,
          55,
          455,
          515,
          535,
          555,
          620,
          635,
          650,
          705,
          720,
          735,
          750,
          805,
          820,
          835,
          850,
          905,
          920,
          935,
          955,
          1015,
          1035,
          1055,
          1115,
          1135,
          1155,
          1215,
          1235,
          1255,
          1315,
          1335,
          1355,
          1415,
          1435,
          1455,
          1515,
          1535,
          1555,
          1620,
          1635,
          1650,
          1705,
          1720,
          1735,
          1750,
          1805,
          1820,
          1835,
          1850,
          1905,
          1920,
          1935,
          1950,
          2005,
          2020,
          2035,
          2050,
          2105,
          2120,
          2135,
          2150,
          2205,
          2220,
          2235,
          2255,
          2315,
          2335,
          2355
        ]
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
}
