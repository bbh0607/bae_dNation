
function displayFlags(db, map) {
  db.collection("scenes")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
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
          scaledSize: new google.maps.Size(120, 90), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };
        let coords = doc.data().location;
        let marker = new google.maps.Marker({
          position: { lat: coords._lat, lng: coords._long },
          map: map,
          icon: icon
        });
        google.maps.event.addListener(marker, "click", function() {
          window.open(
            "http://www.youtube.com/watch?v=" +
              doc.data().video_id +
              "&t=" +
              min +
              "m" +
              sec +
              "s",
            "_blank"
          );
        });
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}
