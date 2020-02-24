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
  let extraCharges;
  let rates;
  let comm; // temporarily disabled
  let distanceInput;
  let request = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  // The location of Uluru
  var uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: uluru
  });
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

      //additional rate for airport transfer
      if (isAirport) {
        if (service <= 3) {
          extraCharges = 15 + service * 5;
        } else {
          extraCharges = 40;
        }
      } else {
        extraCharges = 0;
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
          extraCharges;
      } else if (distanceInput > 60) {
        rates =
          60 * 1.55 +
          (distanceInput - 60) * rateObj[service][3] +
          3 +
          extraCharges;
      }
      rates = rates * 1.05;
      comm = rateObj[service][2] * rates; // optional commission (excluded)

      // additional charges apply during night hours (0000~0600)
      if (0 <= hour && hour <= 6) {
        rates *= 1.2;
      }
      const timeStr = sectoTime(response.routes[0].legs[0].duration.value);
      const answer = "$ ".concat(
        Math.round(0.24 * (rates + extraCharges)).toString()
      );

      // fills out both taxi & vip section with single recursion
      if (!vip) {
        document.getElementById("taxi").innerText = answer;
        document.getElementById("taxiTime").innerText = timeStr;
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
  console.log("min", min);
  var time = hour + "h " + min + "m";
  return time;
}

function calcTrainFare(adult, child, toOther) {
    // priovide optimal KLIA Ekspres package with provided args.
    // adult/child: # of adult/child (int)
    // toOther: whether "OTHER" is in the route.
    // service type: 1 - single, 2 -  group, 3 - family, 
    let service;
    let pax = adult +child;
    if(pax >= 4){
        if (child >= 2) {
            service = 1;
        } else {}
    }
    return service;
}

function calcGrabFare(dist){
    // provide an estimate of Grab fare using distance.
      
}