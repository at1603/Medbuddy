var mongoose = require("mongoose");

var patientStatsSchema = new mongoose.Schema({
  expenditure: {
    type: Number,
    default: 0,
  },
  handlerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  },
  appointment: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("patientStats", patientStatsSchema);
