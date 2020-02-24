function calcFare() {
  var directionsService = new google.maps.DirectionsService();
  var start = document.getElementById("hiddenAddress").value;
  var end = document.getElementById("hiddenDestination").value;
  var pax = document.getElementById("hiddenPassenger").value;
  var luggage = document.getElementById("hiddenLuggage").value;
  var service = document.getElementById("hiddenService").value;
  var isAirport = document.getElementById("triptype").value; //1 - Pickup, 2 - Airport, 3 - Hotel, 4 - Outstation
  var time = document.getElementById("time").value;
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

      //determine taxi services based on pax & luggage
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
      if (isAirport == 2) {
        if (service == 1) {
          extraCharges = 20;
        } else if (service == 2) {
          extraCharges = 25;
        } else if (service == 3) {
          extraCharges = 30;
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
          rates = distanceInput * 1.55 + 3 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.2 * rates;
        } else if (distanceInput > 60) {
          rates = 60 * 1.55 + (distanceInput - 60) * 1.1 + 3 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.2 * rates;
        }
      } else if (service == 2) {
        if (distanceInput <= 60) {
          rates = distanceInput * 1.75 + 5 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.2 * rates;
        } else if (distanceInput > 60) {
          rates = 60 * 1.75 + (distanceInput - 60) * 1.2 + 5 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.2 * rates;
        }
      } else if (service == 3) {
        if (distanceInput <= 60) {
          rates = distanceInput * 1.95 + 6 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.2 * rates;
        } else if (distanceInput > 60) {
          rates = 60 * 1.95 + (distanceInput - 60) * 1.6 + 6 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.2 * rates;
        }
      } else if (service == 4) {
        if (distanceInput <= 60) {
          rates = distanceInput * 3.5 + 7 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.25 * rates;
        } else if (distanceInput > 60) {
          rates = 60 * 3.75 + (distanceInput - 60) * 1.8 + 7 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.25 * rates;
        }
      } else if (service == 5) {
        if (distanceInput <= 60) {
          rates = distanceInput * 4 + 8 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.25 * rates;
        } else if (distanceInput > 60) {
          rates = 60 * 4 + (distanceInput - 60) * 1.8 + 8 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.25 * rates;
        }
      } else if (service == 6) {
        if (distanceInput <= 60) {
          rates = distanceInput * 4.3 + 9 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.25 * rates;
        } else if (distanceInput > 60) {
          rates = 60 * 4.3 + (distanceInput - 60) * 1.8 + 9 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.25 * rates;
        }
      } else if (service == 7) {
        if (distanceInput <= 60) {
          rates = distanceInput * 3.5 + 10 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.25 * rates;
        } else if (distanceInput > 60) {
          rates = 60 * 3.5 + (distanceInput - 60) * 1.8 + 10 + extraCharges;
          rates = rates + rates * 0.05;
          comm = 0.25 * rates;
        }
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
