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

function calcFare() {
  // Initialize gMap, Calculate the total fare and display the route on the map
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const start = coordinates.from;
  const end = coordinates.to;
  const pax = parseInt(result.adult) + parseInt(result.child);
  let isAirport = result.from.includes("KLIA") ? true : false;
  let hour = parseInt(result.deptime.substring(0, 2));
  // let comm; // temporarily disabled
  let distanceInput;
  let request = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  let publicRequest = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode.TRANSIT,
    transitOptions: {
      departureTime: new Date(1337675679473),
      modes: ["BUS"],
      routingPreference: "FEWER_TRANSFERS"
    }
  };
  // The location of Uluru
  var klcc = { lat: 3.1579, lng: 101.712 };
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
      const timeStr = sectoTime(response.routes[0].legs[0].duration.value);
      // Set fares for different modes
      document.getElementById("taxi").innerText = calcTaxiFare(
        distanceInput,
        pax,
        hour,
        isAirport,
        false
      );
      document.getElementById("vip").innerText = calcTaxiFare(
        distanceInput,
        pax,
        hour,
        isAirport,
        true
      );
      document.getElementById("grab").innerText = calcGrabFare(distanceInput);
      // Set estimated time for different modes
      document.getElementById("taxiTime").innerText = timeStr;
      document.getElementById("vipTime").innerText = timeStr;
      document.getElementById("grabTime").innerText = timeStr;
      // Add video thumbnail to map
      initFirestore(map);
      // calcTrainFare();
    }
  });

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setMap(map);
        directionsRenderer.setDirections(response);
        distanceInput = response.routes[0].legs[0].distance.value / 1000;
        const timeStr = sectoTime(response.routes[0].legs[0].duration.value);
        // Set fares for different modes
        document.getElementById("taxi").innerText = calcTaxiFare(
          distanceInput,
          pax,
          hour,
          isAirport,
          false
        );
        document.getElementById("vip").innerText = calcTaxiFare(
          distanceInput,
          pax,
          hour,
          isAirport,
          true
        );
        document.getElementById("grab").innerText = calcGrabFare(distanceInput);
        // Set estimated time for different modes
        document.getElementById("taxiTime").innerText = timeStr;
        document.getElementById("vipTime").innerText = timeStr;
        document.getElementById("grabTime").innerText = timeStr;
        // Add video thumbnail to map
        initFirestore(map);
        // calcTrainFare();
      }
    });
}

function calcTaxiFare(dist, pax, hour, isAirport, vip) {
  //  determine taxi services based on pax & luggage
  // 1: Budget, 2: Premier, 3: Executive MPV, 4-6: Family/VIP, 7: VIP
  let service;
  let fromAirportCharge;
  switch (true) {
    case pax <= 3:
      service = vip ? 7 : 1;
      console.log(`service: ${service}`);
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
  if (dist <= 60) {
    rates =
      dist * rateObj[service][0] + rateObj[service][1] + fromAirportCharge;
  } else {
    rates =
      60 * 1.55 + (dist - 60) * rateObj[service][3] + 3 + fromAirportCharge;
  }
  rates = rates * 1.05;
  comm = rateObj[service][2] * rates; // optional commission (excluded)

  // additional charges apply during night hours (0000~0600)
  if (0 <= hour && hour <= 6) {
    rates *= 1.2;
  }
  return myrToDollar(rates + fromAirportCharge);
}
// google.maps.event.addDomListener(window, "load", calcFare);

function sectoTime(sec) {
  let hour = parseInt(sec / 3600);
  let min = parseInt((sec - hour * 3600) / 60);
  var time = hour + "h " + min + "m";
  return time;
}

function calcGrabFare(dist) {
  // provide an estimate of Grab fare (in USD) using distance (in km).
  return myrToDollar(1 + Math.round(dist * 1.3)*2);
}

function myrToDollar(myr) {
  // convert MYR -> USD & return string with dollar symbol.
  return "$ ".concat(Math.round(0.24 * myr).toString());
}
