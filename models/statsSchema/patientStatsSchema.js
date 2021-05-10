var mongoose = require("mongoose");

var patientStatsSchema = new mongoose.Schema({
  expenditure: {
    type: Number,
    default: 1500,
  },
  handler: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  activeDoctors: {
    type: Number,
    default: 3,
  },
  surgeries: {
    type: Number,
    default: 1,
  },
  appointment: {
    type: Number,
    default: 10,
  },
});

module.exports = mongoose.model("patientStats", patientStatsSchema);
