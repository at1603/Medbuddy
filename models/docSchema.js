var mongoose = require("mongoose");

var docSchema = new mongoose.Schema({
    speciality: String,
    workingAt: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospitals"
        },
        name:String
    },
    qual: [String],
    experience: Number,
    tier: String,
    handler:{
        id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
        },
        username:String
     }
});

module.exports = mongoose.model("doctor", docSchema);