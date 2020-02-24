function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect';
    const changed = document.getElementById(changedId);
    const compare = document.getElementById(comparisonId);
    const displayId = changedId == "fromSelect" ? "fromSearch" : "toSearch";
    const display = document.getElementById(displayId)

    if (
      changed.options[changed.selectedIndex].value ===
      compare.options[compare.selectedIndex].value
    ) compare.value="DEFAULT"
    console.log(compare.value);
    if(changed.value == "OTHER"){ display.hidden = false; }
    else if () { }
    document.getElementById(comparisonId).disabled = false;
}
