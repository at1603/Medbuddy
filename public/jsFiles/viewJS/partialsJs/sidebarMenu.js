var rows = {
  userType: "patient",
};
function sidebarMenuSelector() {
  var patient = document.getElementById("patientMenu");
  // console.log(patient, "1");
  var doctor = document.getElementById("doctorMenu");
  if (rows.userType == "doctor") {
    patient.style.display = "none";
  } else {
    // doctor.style.display = "none";
  }
}

sidebarMenuSelector();
