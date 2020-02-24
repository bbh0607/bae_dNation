function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect';
    const from = document.getElementById(changedId);
    if (from.options[from.selectedIndex].value==0) 
    document.getElementById(comparisonId).disabled = false;
}