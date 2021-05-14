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
  prescription: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
      disease: {
        type: String,
        default: "6",
      },
      medicines: [
        {
          medicineName: {
            type: String,
            default: "4",
          },
          power: {
            type: String,
            default: "6",
          },
          dosage: {
            type: String,
            default: "5",
          },
        },
      ],
      test: [String],
      comment: {
        type: String,
        default: "5",
      },
    },
  ],
});

module.exports = mongoose.model("PatientHistory", patientHistorySchema);
