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
    if (changed.value === "OTHER") {
      displayCompare.hidden = true;
    }
    compare.value = "DEFAULT";
  }
  if (changed.value === "OTHER"){
      displayCompare.hidden = true;
  } else if (compare.valu)
//   display.hidden = !(changed.value == "OTHER" || compare.value == "OTHER");
  document.getElementById(comparisonId).disabled = false;
}
