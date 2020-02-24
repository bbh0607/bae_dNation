function removeDuplicate(element) {
    console.log(`changes made from ${element.id}`);
    
    var from = document.getElementById('fromSelect');
    console.log(from.options[from.selectedIndex].value)
    document.getElementById("toSelect").disabled = false;
}