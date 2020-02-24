function removeDuplicate(element) {
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect';
    const changed = document.getElementById(changedId);
    const compare = document.getElementById(c)
    if (changed.options[changed.selectedIndex].value==) 
    document.getElementById(comparisonId).disabled = false;
}