function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect';
    const changed = document.getElementById(changedId);
    const compare = document.getElementById(comparisonId)
    if (
      changed.options[changed.selectedIndex].value ==
      compare.options[compare.selectedIndex].value
    ) compare.
    document.getElementById(comparisonId).disabled = false;
}