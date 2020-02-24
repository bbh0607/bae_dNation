function openPage(id) {
  var otherID = id === "transport" ? "video" : "transport";
  if (!document.getElementById(id).style) {
    document.getElementById(id).style.display = 'block';
    document.getElementById(otherID).style.display = 'none';
  }
}
