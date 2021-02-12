var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({

  roomId: { type: String, default: null },
  relation: {
    docId: { type: String, default: null },
    patientId: { type: String, default: null },
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
