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
  const luggage = 3; // temporary placeholder
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
  var comm = "";
  var distanceInput = "";
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
      if (pax <= 4) {
        if (luggage <= 3) {
          if (service == 1) {
            $("#service").val("1");
            $("#hiddenService").val("1");
            service = 1;
          } else if (service == 2) {
            $("#service").val("2");
            $("#hiddenService").val("2");
            service = 2;
          } else if (service == 3) {
            $("#service").val("3");
            $("#hiddenService").val("3");
            service = 3;
          }
        } else {
          if (service == 1 || service == 2) {
            $("#service").val("2");
            $("#hiddenService").val("2");
            service = 2;
          } else if (service == 3) {
            $("#service").val("3");
            $("#hiddenService").val("3");
            service = 3;
          }
        }
      } else if (pax <= 5 && luggage <= 5) {
        $("#service").val("3");
        $("#hiddenService").val("3");
        service = 3;
      } else if (pax <= 8 && luggage <= 8) {
        $("#service").val("4");
        $("#hiddenService").val("4");
        service = 4;
      } else if (pax <= 10 && luggage <= 14) {
        $("#service").val("5");
        $("#hiddenService").val("5");
        service = 5;
      } else if (pax <= 13 && luggage <= 18) {
        $("#service").val("6");
        $("#hiddenService").val("6");
        service = 6;
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
      if (service == 1) {
        if (distanceInput <= 60) {
          rates = distanceInput * distRate + addedRate + extraCharges;
        } else if (distanceInput > 60) {
          rates =
            60 * 1.55 + (distanceInput - 60) * elseRate + 3 + extraCharges;
        }
        rates = rates * 1.05;
        comm = commRate * rates;
      }

      $("#midnightFlag").val("0");

      if (sec >= 0 && sec <= 21600) {
        midnightCharges = midnightChargesPercentage * rates;
        rates = rates + midnightCharges;
        $("#midnightFlag").val("1");
      }

      if (sec >= 414000) {
        midnightCharges = midnightChargesPercentage * rates;
        rates = rates + midnightCharges;
        $("#midnightFlag").val("1");
      }

      $("#fare_rate").val("RM" + rates.toFixed(2));
      $("#hidden_fare_rate").val(rates.toFixed(2));
      $("#commision").val(comm.toFixed(2));
    }
  });
}
