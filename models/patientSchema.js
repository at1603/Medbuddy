var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
    handler:{
        id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
        },
        username:String
     },
     prescription: [String],
     curDoc:[String],   //Currently appointed doctors.
     disease: [String],
     appointment: [
         {
            docId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Doctor"
            },
            appointId: {
               type: mongoose.mongoose.Schema.Types.ObjectId,
               ref: "Appointment"
            }
         }
      ],
});

module.exports = mongoose.model("Patient", patientSchema);