function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect'
    const from = document.getElementById(changedId);
    const selectedVal = from.options[from.selectedIndex].value
    document.getElementById(comparisonId).disabled = false;
}