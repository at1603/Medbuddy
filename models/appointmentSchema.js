var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({

  roomId: { type: String, default: null },
  patientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient"
  },
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  phone: {type: Number, required: true},
  slot: {type: Date, required: false, default: null},
  disease: {type: String, required: true}
});

module.exports = mongoose.model("Appointment", appointmentSchema);
