var data = {
  isConfirmed: false,
};
var confirmAppointment = document.getElementsByClassName("appntBtn");
console.log(confirmAppointment);
var cancelAppointment = document.getElementsByClassName("cancelBtn");
for (var i = 0; i < confirmAppointment.length; i++) {
  if (data.isConfirmed == true) {
    confirmAppointment[i].style.display = "none";
  } else {
    cancelAppointment[i].style.display = "none";
  }
}
