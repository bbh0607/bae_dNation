function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect';
    const changed = document.getElementById(changedId);
    const compare = document.getElementById(comparisonId);
    const displayId = changedId == "fromSelect" ? "fromSearch" : "toSearch";
    const display = document.getElementsByName(displayId)

    if (
      changed.options[changed.selectedIndex].value ===
      compare.options[compare.selectedIndex].value
    ) compare.value="DEFAULT"
    console.log(compare.value);
    display.hidden = changed.value == "OTHER" || compare.value =="OTHER"  
    document.getElementById(comparisonId).disabled = false;
}
