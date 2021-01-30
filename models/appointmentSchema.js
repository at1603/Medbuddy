var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
    roomId: String
});

module.exports = mongoose.model("Appointment", appointmentSchema)