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
     appointmentId: String,
});

module.exports = mongoose.model("Hospitals", patientSchema);