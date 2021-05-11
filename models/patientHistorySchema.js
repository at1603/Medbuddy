var mongoose = require("mongoose");

var patientHistorySchema = new mongoose.Schema({
  handlerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  appointedDoctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: false,
  },
  prescription: {
    date: {
      type: [String],
      default: () => {
        return null;
      },
    },
    disease: {
      type: [String],
      default: () => {
        return null;
      },
    },
    medicines: [
      {
        medicineName: { type: String, default: null },
        power: { type: String, default: null },
        dosage: { type: String, default: null },
      },
    ],
    test: {
      type: [String],
      default: () => {
        return null;
      },
    },
    comment: {
      type: [String],
      default: () => {
        return null;
      },
    },
  },
});

module.exports = mongoose.model("PatientHistory", patientHistorySchema);
