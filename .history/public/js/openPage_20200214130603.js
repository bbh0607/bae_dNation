function openPage(id) {
  var otherID = id === "transport" ? "video" : "transport";
  console.log(id)
  if (document.getElementById(id).style.display) {
    document.getElementById(id).style.display = "block";
    document.getElementById(otherID).style.display = "none";
  }
}
