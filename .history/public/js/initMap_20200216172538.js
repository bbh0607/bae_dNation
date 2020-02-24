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

window.f1 = function(){
  console.log("aaaaaaaaaaaaaa");
}

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
      switch (true) {
        case pax <= 3:
          service = vip ? 7 : 1;
          console.log(`service: ${service}`)
          break;
        case pax <= 5:
          service = vip ? 4 : 3;
          break;
        case pax <= 8:
          service = vip ? 6 : 4;
          break;
        case pax <= 10:
          service = vip ? 6 : 5;
          break;
        case pax <= 13:
          service = 6;
          break;
        default:
          service = 1;
      }

      // additional rate for airport transfer
      // (starting from airport)
      if (isAirport) {
        if (service <= 3) {
          fromAirportCharge = 15 + service * 5;
        } else {
          fromAirportCharge = 40;
        }
      } else {
        fromAirportCharge = 0;
      }

      // collective rates for all options
      const rateObj = {
        1: [1.55, 3, 0.2, 1.1],
        3: [1.95, 6, 0.2, 1.6],
        4: [3.5, 7, 0.25, 1.8],
        5: [4, 8, 0.25, 1.8],
        6: [4.3, 9, 0.25, 1.8],
        7: [3.5, 10, 0.25, 1.8]
      };
      // calculate rates,commision & midnight rate
      // additional 0.05% for all rates
      if (distanceInput <= 60) {
        rates =
          distanceInput * rateObj[service][0] +
          rateObj[service][1] +
          fromAirportCharge;
      } else {
        rates =
          60 * 1.55 +
          (distanceInput - 60) * rateObj[service][3] +
          3 +
          fromAirportCharge;
      }
      rates = rates * 1.05;
      comm = rateObj[service][2] * rates; // optional commission (excluded)

      // additional charges apply during night hours (0000~0600)
      if (0 <= hour && hour <= 6) {
        rates *= 1.2;
      }
      const timeStr = sectoTime(response.routes[0].legs[0].duration.value);
      const answer = myrToDollar(rates+fromAirportCharge)

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
      }
    }
  });
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