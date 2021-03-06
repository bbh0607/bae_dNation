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
    //ekspresTime(db)
}

function ekspresTime(db) {
  const from = result.from;
  const to = result.to;
  const time = parseInt(result.deptime.replace(":", ""))
  if
  console.log(from, to, time);
  db.collection("timetable")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}

function calcTrainFare(isOther) {
  // priovide optimal KLIA Ekspres package with provided args.
  // adult/child: # of adult/child (int)
  // isOther: whether "OTHER" is in the route.
  // service type: 1 - single, 2 -  group, 3 - family, 4 - grab package
  if(isOther) document.getElementById("trainWarning").hidden = false;
  const child = result.child;
  const adult = result.adult;
  const fareObj = {
      1:[],
      2:[],
      3:[],
      4:[]
  }
  let service;
  let pax = adult + child;
  if (pax >= 4) {
    if (child >= 2) {
      service = adult >= 2 ? 4 : 1;
    } else {
      service = 2;
    }
  } else {
    if (pax === 3) {
      service = child >= 2 ? 1 : 2;
    } else {
      service = isOther ? 4 : 1;
    }
  }
  return service;
}
