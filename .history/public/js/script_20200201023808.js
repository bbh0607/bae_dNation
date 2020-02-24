function removeDuplicate(element) {
    console.log(`changes made from ${element.id}`);
    const changedId = element.id;
    const comparisonId = changedId == 'fromSelect'? 'toSelect': 'fromSelect'
    var from = document.getElementById('fromSelect');
    console.log(from.options[from.selectedIndex].value)
    document.getElementById("toSelect").disabled = false;
}