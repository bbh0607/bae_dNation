function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect'
    var from = document.getElementById(changedId);
    document.getElementById(comparisonId).disabled = false;
}