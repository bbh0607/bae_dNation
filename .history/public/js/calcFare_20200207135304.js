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
  const directionsService = new google.maps.DirectionsService();
  const start = coordinates.from;
  const end = coordinates.to;
  const pax = parseInt(result.adult) + parseInt(result.child);
  // const luggage = 3; // temporary placeholder
  var service; // temporary placeholder;
  var isAirport = result.from.includes("KLIA") ? true : false;
  var time = result.deptime;
  var hour = time.substring(0, 2);
  var min = time.substring(3, 5);
  var sec = hour * 3600 + min * 60;
  var midnightChargesPercentage = 0.2;
  var midnightCharges;
  var extraCharges;
  var rates = "";
  var comm;
  var distanceInput = "";
  var isVip = false;
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      distanceInput = response.routes[0].legs[0].distance.value / 1000;
      console.log(distanceInput);
      console.log(typeof time);
      //   determine taxi services based on pax & luggage
      switch (true) {
        case pax <= 3:
          service = isVip? 7:1;
          break;
        case pax <= 5:
          service = isVip? 4:3;
          break;
        case pax <= 8:
          service = isVip? 6:4;
          break;
        case pax <= 10:
          service = isVip? 6:5;
          break;
        case pax <= 13:
          service = 6
          break;
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

      //calculate rates,commision & midnight rate
      //additional 0.05% for all rates
      const rateObj = {
          1: [1.55, 3, ],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
      }
      {
        if (distanceInput <= 60) {
          rates = distanceInput * distRate + addedRate + extraCharges;
        } else if (distanceInput > 60) {
          rates =
            60 * 1.55 + (distanceInput - 60) * elseRate + 3 + extraCharges;
        }
        rates = rates * 1.05;
        comm = commRate * rates;
      }


      if (sec >= 0 && sec <= 21600) {
        midnightCharges = midnightChargesPercentage * rates;
        rates = rates + midnightCharges;
      }

      if (sec >= 414000) {
        midnightCharges = midnightChargesPercentage * rates;
        rates = rates + midnightCharges;
      }

      console.log(`Total Price = ${rates+extraCharges+comm}`)
    }
  });
}
