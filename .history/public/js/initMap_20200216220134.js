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
  let directionsRenderer = new google.maps.DirectionsRenderer();
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
google.maps.event.addDomListener(window, "load", calcFare);

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

function calcGrabFare(dist) {
  // provide an estimate of Grab fare (in USD) using distance (in km).
  return myrToDollar(1 + Math.round(dist * 1.3));
}

function myrToDollar(myr) {
  // convert MYR -> USD & return string with dollar symbol.
  return "$ ".concat(Math.round(0.24 * myr).toString());
}

const timetable = {
  0: {
    L: null,
    R: [
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
  },
  1: {
    L: [
      [
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
      ]
    ],
    R: [
      [
        0,
        30,
        100,
        500,
        520,
        540,
        600,
        625,
        640,
        655,
        710,
        725,
        740,
        755,
        810,
        825,
        840,
        855,
        910,
        925,
        940,
        1000,
        1020,
        1040,
        1100,
        1120,
        1140,
        1200,
        1220,
        1240,
        1300,
        1320,
        1340,
        1400,
        1420,
        1440,
        1500,
        1520,
        1540,
        1600,
        1625,
        1640,
        1655,
        1710,
        1725,
        1740,
        1755,
        1810,
        1825,
        1840,
        1855,
        1910,
        1925,
        1940,
        1955,
        2010,
        2025,
        2040,
        2055,
        2110,
        2125,
        2140,
        2155,
        2210,
        2225,
        2240,
        2300,
        2320,
        2340
      ]
    ]
  },
  2: {
    L: [
      [
        5,
        40,
        500,
        520,
        540,
        600,
        615,
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
        920,
        940,
        1000,
        1020,
        1040,
        1100,
        1120,
        1140,
        1200,
        1220,
        1240,
        1300,
        1320,
        1340,
        1400,
        1420,
        1440,
        1500,
        1520,
        1540,
        1600,
        1615,
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
        2220,
        2240,
        2300,
        2320,
        2340
      ]
    ],
    R: null
  }
};
