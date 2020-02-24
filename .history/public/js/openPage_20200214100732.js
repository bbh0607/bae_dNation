function openPage(id) {
  var otherID = id === "transport" ? "video" : "transport";
  if (!document.getElementById(id)) {
    document.getElementById(id).style.display = "block";
    document.getElementById(otherID).style.display = "block";
  }
}
