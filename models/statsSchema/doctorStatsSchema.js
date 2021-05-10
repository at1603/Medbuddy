var mongoose = require("mongoose");

var doctorStatsSchema = new mongoose.Schema({
  earnings: {
    type: Number,
  },
  handler: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  newPatients: {
    type: Number,
  },
  operations: {
    type: Number,
  },
  appointment: {
    type: Number,
  },
});

module.exports = mongoose.model("doctorStats", doctorStatsSchema);
