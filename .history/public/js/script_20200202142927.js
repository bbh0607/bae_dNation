function removeDuplicate(element) {
  const changedId = element.id;
  const comparisonId = changedId == "fromSelect" ? "toSelect" : "fromSelect";
  const changed = document.getElementById(changedId);
  const compare = document.getElementById(comparisonId);

  const displayId = changedId == "fromSelect" ? "fromSearch" : "toSearch";
  const displayCompareId =
    changedId == "fromSelect" ? "toSearch" : "fromSearch";
  const display = document.getElementById(displayId);
  const displayCompare = document.getElementById(displayCompareId);

  console.log(changed.value, compare.value);
  if (changed.value === compare.value) {
    compare.value = "DEFAULT";
  }
  if (changed.value === "OTHER") {
    display.hidden = false;
    displayCompare.hidden = true;
  } else {
    console.log(``)
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
  //console.log(`previous value is ${prevObject.value} with id ${prevObject.id}`);
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
