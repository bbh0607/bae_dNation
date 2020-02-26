
const search = location.search.substring(1);
// Object containing input made by user
const input = JSON.parse(
  '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
  function(key, value) {
    return key === "" ? value : decodeURIComponent(value);
  }
);
console.log(input);
// Object containing actual coords of dep/arrival location

function initMap() {
    var klcc = { lat: 3.1579, lng: 101.712 };
    // The map, centered at klcc
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: klcc
    });
    var marker = new google.maps.Marker({ position: klcc, map: map });
    
    console.log("in the function");
    displayFlags(map);
}
