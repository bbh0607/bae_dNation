function removeDuplicate(e) {
    console.log('changes made');
    var from = document.getElementById('fromSelect');
    console.log(from.options[from.selectedIndex].value)
    document.getElementById("toSelect").disabled = false;
}