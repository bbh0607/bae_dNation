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
  klia = new google.maps.LatLng({ lat: 2.7548383, lng: 101.7048527 });
  klia2 = new google.maps.LatLng({ lat: 2.7471436, lng: 101.6853894 });
  klSentral = new google.maps.LatLng({
    lat: 3.134338499999999,
    lng: 101.6863371
  });
  var autocomplete = new google.maps.places.Autocomplete(input, optionsAuto);
  google.maps.event.addListener(autocomplete, "place_changed", function() {
    var place = autocomplete.getPlace();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    input.value = place.name;
    console.log("!!!!", place.name, lat, lng);
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
  });
}

let geoInfo = {
  from: {},
  to: {}
};

let klia;
let klia2;
let klSentral;