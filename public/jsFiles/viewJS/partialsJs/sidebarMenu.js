var rows = {
  userType: "doctor",
};
function sidebarMenuSelector() {
  var patient = document.getElementById("patientMenu");
  var doctor = document.getElementById("doctorMenu");
  if (rows.userType == "doctor") {
    // patient.style.display = "none";
  } else {
    // doctor.style.display = "none";
  }
}

sidebarMenuSelector();
