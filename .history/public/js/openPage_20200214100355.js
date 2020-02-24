function openPage(id) {
  var otherID = id === "transport" ? "video" : "transport";
  if (!document.getElementById(id).style.display) {
    document.getElementById(id).style.display = 'block';
    
  }
}
