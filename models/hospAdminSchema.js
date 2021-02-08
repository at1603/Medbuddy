var mongoose = require("mongoose");

var hospAdminSchema = new mongoose.Schema({
    oxyCur: Number,
    ambCur: Number, //Ambulance availability
    numBeds: Number,
    partOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        default: null
    },
    handler:{
        id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
        },
        username:String
    },
    adminContact: {
        email: String,
        phone: Number
    }
});

module.exports = mongoose.model("HospAdmin", hospAdminSchema);