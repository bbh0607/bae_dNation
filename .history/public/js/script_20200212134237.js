// Global variables (initialzed by initMap())
let geoInfo = {
  from: null,
  to: null
};

let klia;
let klia2;
let klSentral;
let prevObject;

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
  // Manipulate values for select / textinput (prevent from & to being the same loc)
  if (changed.value === compare.value) {
    compare.value = "DEFAULT";
    setGeoInfo(compare, "OTHER");
  }
  if (changed.value === "OTHER") {
    display.hidden = false;
    displayCompare.hidden = true;
    setGeoInfo(changed, "OTHER");
  } else {
    if (prevObject.id == changedId && prevObject.value === "OTHER") {
      display.hidden = true;
      setGeoInfo(changed, "OTHER");
    }
  }
  document.getElementById(comparisonId).disabled = false;
  setGeoInfo(changed, changed.value);
  console.log(geoInfo);
}
// Helper function for handleChange()
function setGeoInfo(document, val) {
  var prop = document.id === "fromSelect" ? "from" : "to";
  if (val === "KLIA") {
    geoInfo[prop] = klia;
  } else if (val === "KLIA2") {
    geoInfo[prop] = klia2;
  } else if (val === "SENTRAL") {
    geoInfo[prop] = klSentral;
  } else {
    // val === "OTHER"
    geoInfo[prop] = null;
  }
}
// Helper function for handleChange()
function setPrev(element) {
  prevObject = {
    value: element.value,
    id: element.id
  };
}

function initMap() {
  // Initialize basic locations
  klia = new google.maps.LatLng({ lat: 2.7548383, lng: 101.7048527 });
  klia2 = new google.maps.LatLng({ lat: 2.7471436, lng: 101.6853894 });
  klSentral = new google.maps.LatLng({
    lat: 3.134338499999999,
    lng: 101.6863371
  });
  // Initialization for fromSearch
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
    geoInfo.from = new google.maps.LatLng({ lat: lat, lng: lng });
  });
  // Initialization for toSearch
  var input2 = document.getElementById("destination");
  var autocomplete2 = new google.maps.places.Autocomplete(input2, optionsAuto);
  google.maps.event.addListener(autocomplete2, "place_changed", function() {
    var place = autocomplete2.getPlace();
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    input.value = place.name;
    geoInfo.to = new google.maps.LatLng({ lat: lat, lng: lng });
  });
}

// Store jsonified geoInfo object to localstorage
function makeJson() {
  localStorage["geoInfoJson"] = JSON.stringify(geoInfo);
}

// Check if both to & from for geoInfo object is not null
// Also check if total # of people <= 18
function validateForm() {
  const geo = geoInfo.from && geoInfo.to ? true : false;
  const numAdult = parseInt(document.getElementById("adult").value);
  const numChild = parseInt(document.getElementById("child").value);
  const num = numAdult + numChild <= 18 ? true : false;
  console.log(`number: ${num}`)
  return geo && num;
}

function switchScreen(){
  let
  if (){
    
  } else {

  }
}