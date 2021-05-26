var mongoose = require("mongoose");

var docSchema = new mongoose.Schema({
  speciality: String,
  handler_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  workingAt: {
    type: String,
    ref: "Hospital",
    default: "Not Connected",
  },
  workAtHosp: {
    type: String,
    default: "Not Connected",
    // ref: "Hospital"
  },
  timing: {
    morning: {
      timingFrom: String,
      timingTo: String,
    },
    evening: {
      timingFrom: String,
      timingTo: String,
    },
  },
  availableSlots: {
    slotA: {
      a: {
        type: Number,
        default: 10,
        min: 0,
      },
      b: {
        type: Number,
        default: 10,
        min: 0,
      },
      c: {
        type: Number,
        default: 10,
        min: 0,
      },
      d: {
        type: Number,
        default: 10,
        min: 0,
      },
    },
    slotB: {
      a: {
        type: Number,
        default: 10,
        min: 0,
      },
      b: {
        type: Number,
        default: 10,
        min: 0,
      },
      c: {
        type: Number,
        default: 10,
        min: 0,
      },
      d: {
        type: Number,
        default: 10,
        min: 0,
      },
    },
  },
  rating: { type: Number, default: 0, min: 0 },
  qual: String,
  experience: Number,
  tier: String,
  fees: Number,
});

module.exports = mongoose.model("Doctor", docSchema);
