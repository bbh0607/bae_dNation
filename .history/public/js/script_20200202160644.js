function handleChange(element) {
  // Info of changed select location (to || from)
  const changedId = element.id;
  const comparisonId = changedId == "fromSelect" ? "toSelect" : "fromSelect";
  const changed = document.getElementById(changedId);
  const compare = document.getElementById(comparisonId);
  // Info of the other location field
  const displayId = changedId == "fromSelect" ? "fromSearch" : "toSearch";
  const displayCompareId =
    changedId == "fromSelect" ? "toSearch" : "fromSearch";
  const display = document.getElementById(displayId);
  const displayCompare = document.getElementById(displayCompareId);

  if (changed.value === compare.value) {
    compare.value = "DEFAULT";
  }
  if (changed.value === "OTHER") {
    display.hidden = false;
    displayCompare.hidden = true;
  } else {
    if (prevObject.id == changedId && prevObject.value === "OTHER") {
      display.hidden = true;
    }
  }
  document.getElementById(comparisonId).disabled = false;
}

let prevObject;

function setPrev(element) {
  prevObject = {
    value: element.value,
    id: element.id
  };
}

function initMap() {
  var input = document.getElementById("address");
  var optionsAuto = {
    componentRestrictions: {
      country: "MY"
    }
  };
  var autocomplete = new google.maps.places.Autocomplete(input, optionsAuto);
  google.maps.event.addListener(autocomplete, "place_changed", function() {
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    input.value = place.name;
    //console.log(place)
    console.log(""place.name, lat, lng);
    // $("#addressLat").val(lat);
    // $("#addressLong").val(lng);
    // $("#hiddenAddress")
    //   .val(document.getElementById("address").value)
    //   .trigger("change");
  });

  var input2 = document.getElementById("destination");
  var optionsAuto = {
    componentRestrictions: {
      country: "MY"
    }
  };

  var autocomplete2 = new google.maps.places.Autocomplete(input2, optionsAuto);
  google.maps.event.addListener(autocomplete2, "place_changed", function() {
    var place = autocomplete2.getPlace();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    // $("#hiddenDestination")
    //   .val(document.getElementById("destination").value)
    //   .trigger("change");
  });
}

let geoInfo = {
    from: {},
    to: {}
};

const klia = new google.maps.LatLng({ lat: -34, lng: 151 });
const klia2 = new google.maps.LatLng({ lat: -34, lng: 151 });
const klSentral = new google.maps.LatLng({ lat: -34, lng: 151 });