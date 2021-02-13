var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({

  handler: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  prescription: [
    {
      relDoc: String,
      presc: {
        docName: String,
        patName: String,
        disease: [String],
        medicines: [
          {
            medicineName: String,
            power: String,
            dosage: String,
          },
        ],
        test: [String],
        comment: String,
      },

      default: null,
    },
  ],
  curDoc: [String], //Currently appointed doctors.
  disease: [
    {
      relDoc: String,
      diseaseName: String,
      default: null,
    },
  ],
  appointment: [
    {
      docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
      appointId: {
        type: mongoose.mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    },
  ],
});

module.exports = mongoose.model("Patient", patientSchema);
