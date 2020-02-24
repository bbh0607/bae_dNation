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
  if (changed.value === "OTHER"){
      display.hidden = false;
      displayCompare.hidden = true;
  } else if (compare.value === "OTHER") {
      displayCompare.hidden = false;
      display.hidden = true;
  }
  document.getElementById(comparisonId).disabled = false;
}
