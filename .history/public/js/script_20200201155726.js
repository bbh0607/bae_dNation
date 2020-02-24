function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect';
    const changed = document.getElementById(changedId);
    const compare = document.getElementById(comparisonId);

    if (
      changed.options[changed.selectedIndex].value ===
      compare.options[compare.selectedIndex].value
    ) compare.value="DEFAULT"
    if (changed.options[changed.selectedIndex].value === "OTHER") {
        display.hidden = false;
    } else { display.hidden=true; }
    document.getElementById(comparisonId).disabled = false;
}