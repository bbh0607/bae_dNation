function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect';
    const displayId = changedId == 'fromSelect' ? 'fromSearch': 'toSearch';
    const changed = document.getElementById(changedId);
    const compare = document.getElementById(comparisonId)
    if (
      changed.options[changed.selectedIndex].value ===
      compare.options[compare.selectedIndex].value
    ) compare.value="DEFAULT"
    if (changed.options[changed.selectedIndex].value === "OTHER") {
        
    }
    document.getElementById(comparisonId).disabled = false;
}