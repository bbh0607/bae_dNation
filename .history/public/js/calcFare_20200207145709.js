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
  const directionsService = new google.maps.DirectionsService();
  const start = coordinates.from;
  const end = coordinates.to;
  const pax = parseInt(result.adult) + parseInt(result.child);
  // const luggage = 3; // temporary placeholder
  var service;
  var isAirport = result.from.includes("KLIA") ? true : false;
  var hour = parseInt(result.deptime.substring(0, 2));
  var extraCharges;
  var rates;
  var comm;
  var distanceInput;
  var isVip = vip ? true : false;
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      distanceInput = response.routes[0].legs[0].distance.value / 1000;
      dur = response.routes[0].legs[0].duration.value;
      console.log(`isVip: ${isVip}`)
      console.log(distanceInput);
      console.log(`total duration: ${dur} seconds`);
      //  determine taxi services based on pax & luggage
      // 1: Budget, 2: Premier, 3: Executive MPV, 4-6: Family/VIP, 7: VIP
      switch (true) {
        case pax <= 3:
          service = isVip ? 7 : 1;
          break;
        case pax <= 5:
          service = isVip ? 4 : 3;
          break;
        case pax <= 8:
          service = isVip ? 6 : 4;
          break;
        case pax <= 10:
          service = isVip ? 6 : 5;
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
      comm = rateObj[service][2] * rates;
      if (0 <= hour <= 6) {
        rates = 1.2 * rates;
      }
      console.log(
        `rates: ${rates}, extracharges: ${extraCharges}, comm: ${comm}`
      );
      console.log(`Total Price = ${rates + extraCharges + comm}`);
      // Total Price = rates + extraCharges + comm
      document.getElementById("res").innerText = rates;
    }
  });
}

function setVip() {
    if
}
