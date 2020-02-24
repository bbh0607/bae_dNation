function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect'
    const from = document.getElementById(changedId);
    console.log(from.options[from.selectedIndex].value)
    document.getElementById(comparisonId).disabled = false;
}