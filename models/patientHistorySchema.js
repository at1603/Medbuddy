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
      review: {type: Number, default: null, min: 0},
      appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
      },
      date: {
        type: Date,
        default: "",
      },
      disease: {
        type: String,
        default: "",
      },
      medicines: [
        {
          medicineName: {
            type: String,
            default: "",
          },
          dosage: {
            type: String,
            default: "",
          },
          frequency: {
            type: String,
            default: "",
          },
        },
      ],
      test: [
        {
          testName: {
            type: String,
            default: "",
          },
        },
      ],
      comment: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("PatientHistory", patientHistorySchema);
