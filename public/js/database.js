function initFirestore(map, start, end) {
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
    displayFlags(db, map, start, end);
    ekspresTime(db);
    calcTrainFare();
}

function loadVideo(link, time) {
    //player.loadVideoById(Id, time,"default")
    player.loadVideoByUrl(link,time,"default")
    document.getElementById("myDialog").showModal();
} 

function calcDistance(lat1, lon1, lat2, lon2){
  function toRad(x) {
    return x * Math.PI / 180;
  }

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
}

function displayFlags(db, map, start, end) {
  db.collection("scenes")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let coords = doc.data().location;
        let distance_start = calcDistance(coords._lat, coords._long, start.lat, start.lng);
        let distance_end = calcDistance(coords._lat, coords._long, end.lat, end.lng);
        if(distance_start < 5 || distance_end < 5){
          // console.log(doc.id, "=>", doc.data().location);
          // TODO: Get rid of function below and load real-time thumbnails
          let t = doc.data().time
          console.log(doc.id,t);
          let [min, sec] = t.split(":")
          min = parseInt(min);
          sec = parseInt(sec);
          // function getRandomInt(max) {
          //   return Math.floor(Math.random() * Math.floor(max)) + 1;
          // }
          // getRandomInt(2);
          // let image =
          //   "https://i1.ytimg.com/vi/" +
          //   doc.data().video_id +
          //   "/" +
          //   getRandomInt(2) +
          //   ".jpg";
          // let image = doc.data().scene_img.replace("dl=0","raw=1");
          var icon = {
            url: doc.data().scene_img.replace("dl=0","raw=1"),
            //scaledSize: new google.maps.Size(120, 90), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          };
          //let coords = doc.data().location;
          let marker = new google.maps.Marker({
            position: { lat: coords._lat, lng: coords._long },
            map: map,
            icon: icon
          });
            google.maps.event.addListener(marker, "click", function () {
                var time = min * 60 + sec;
                var video_link = "https://www.youtube.com/v/"
                    + doc.data().video_id
                    + "?version=3";
                loadVideo(video_link,time);
          });
        }
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });

}

/*function escClose(evt) {
    console.log(evt.keyCode);
    if (evt.keyCode == 27 && document.getElementById("myDialog").open) {
        player.pauseVideo()
    }
}*/

function ekspresTime(db) {
  const [fromID, toID] = stationID([result.from, result.to]);
  const direction = fromID - toID > 0 ? "left" : "right";
  let duration;
  if (Math.abs(fromID - toID) == 2) {
    duration = 33;
  } else {
    if (fromID === 2 || toID === 2) {
      duration = fromID - toID < 0 ? 3 : 5;
    } else {
      duration = fromID - toID < 0 ? 30 : 28;
    }
  }
  document.getElementById("trainTime").innerText = duration
    .toString()
    .concat("m");
  const time = parseInt(result.deptime.replace(":", ""));
  //   console.log(fromID, toID, time);
  db.collection("timetable")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // console.log();
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}

function stationID(items) {
  let res = [];
  for (var i of items) {
    if (i == "KLIA2") {
      res.push(2);
    } else if (i == "KLIA") {
      res.push(1);
    } else {
      res.push(0);
    }
  }
  return res;
}

function calcTrainFare() {
  // priovide optimal KLIA Ekspres package with provided args.
  // adult/child: # of adult/child (int)
  // isOther: whether "OTHER" is in the route.
  // service type: 1 - single, 2 -  group, 3 - family, 4 - grab package
  let isOther = false;
  if (result.from === "OTHER" || result.to === "OTHER") {
    document.getElementById("trainWarning").hidden = false;
    isOther = true;
  }

  let isShortRide =
    (result.from === "KLIA" && result.to === "KLIA2") ||
    (result.from === "KLIA2" && result.to === "KLIA");
  const child = result.child;
  const adult = result.adult;
  const fareObj = {
    1: [55, 25],
    2: [40, 40],
    3: [40, 20],
    4: [50, 22]
  };
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
  let total = !isShortRide
    ? fareObj[service][0] * adult + fareObj[service][1] * child
    : adult * 2 + child;
  document.getElementById("train").innerText = myrToDollar(total);
}
