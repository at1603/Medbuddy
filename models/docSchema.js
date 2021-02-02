var mongoose = require("mongoose");

var docSchema = new mongoose.Schema({
    speciality: String,
    workingAt: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital"
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

module.exports = mongoose.model("Doctor", docSchema);