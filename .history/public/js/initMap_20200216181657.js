const search = location.search.substring(1);
// Object containing input made by user
const result = JSON.parse(
  '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
  function(key, value) {
    return key === "" ? value : decodeURIComponent(value);
  }
);
console.log(result);
// Object containing actual coords of dep/arrival location
var coordinates = JSON.parse(localStorage["geoInfoJson"]);

function calcFare(vip) {
  // Initialize gMap, Calculate the total fare and display the route on the map
  const directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
  const start = coordinates.from;
  const end = coordinates.to;
  const pax = parseInt(result.adult) + parseInt(result.child);
  let service;
  let isAirport = result.from.includes("KLIA") ? true : false;
  let hour = parseInt(result.deptime.substring(0, 2));
  let fromAirportCharge;
  let rates;
  let comm; // temporarily disabled
  let distanceInput;
  let request = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  // The location of Uluru
  var klcc = { lat: 3.1579, lng: 101.7120 };
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: klcc
  });
  if (isAirport) document.getElementById("taxiWarning").hidden = false;
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(response);
      distanceInput = response.routes[0].legs[0].distance.value / 1000;
      //   console.log(distanceInput);
      //   console.log(`total duration: ${dur} seconds`);
      //  determine taxi services based on pax & luggage
      // 1: Budget, 2: Premier, 3: Executive MPV, 4-6: Family/VIP, 7: VIP
     

      // fills out both taxi & vip section with single recursion
      if (!vip) {
        document.getElementById("taxi").innerText = answer;
        document.getElementById("taxiTime").innerText = timeStr;
        document.getElementById("grabTime").innerText = timeStr;
        document.getElementById("grab").innerText = myrToDollar(calcGrabFare(distanceInput));
        calcFare(true);
      } else {
        document.getElementById("vip").innerText = answer;
        document.getElementById("vipTime").innerText = timeStr;
        initFirestore(map);
      }
    }
  });
}


function calcTaxiFare(dist, isAirport, isVip){
  
}

function sectoTime(sec) {
  let hour = parseInt(sec / 3600);
  let min = parseInt((sec - hour * 3600) / 60);
  var time = hour + "h " + min + "m";
  return time;
}

function calcTrainFare(adult, child, toOther) {
  // priovide optimal KLIA Ekspres package with provided args.
  // adult/child: # of adult/child (int)
  // toOther: whether "OTHER" is in the route.
  // service type: 1 - single, 2 -  group, 3 - family, 4 - grab package
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
      service = toOther ? 4 : 1;
    }
  }
  return service;
}

google.maps.event.addDomListener(window, "load", calcFare);

function calcGrabFare(dist) {
  // provide an estimate of Grab fare (in MYR) using distance (in km).
    return 1+ Math.round(dist*1.30)
}

function myrToDollar(myr) {
 // convert MYR -> USD & return string with dollar symbol.
 return "$ ".concat(Math.round(0.24 * (myr)).toString());
}