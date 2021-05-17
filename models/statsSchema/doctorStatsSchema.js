var mongoose = require("mongoose");

var doctorStatsSchema = new mongoose.Schema({
  earnings: {
    type: Number,
    default: 0
  },
  handlerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  },
  newPatients: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  appointment: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model("doctorStats", doctorStatsSchema);
