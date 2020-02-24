function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect';
    const changed = document.getElementById(changedId);
    const compare = document.getElementById(comparisonId);
    const displayId = changedId == "fromSelect" ? "fromSearch" : "toSearch";
    const display = document.getElementById(displayId);

    console.log(changed.value, compare.value)
    if (
      changed.options[changed.selectedIndex].value ===
      compare.options[compare.selectedIndex].value
    ) {
        if ()
        compare.value="DEFAULT"
    }
    display.hidden = !(changed.value == "OTHER" || compare.value =="OTHER") 
    document.getElementById(comparisonId).disabled = false;
}
