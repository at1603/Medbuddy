var mongoose = require("mongoose");

var hospAdminSchema = new mongoose.Schema({
    oxyCur: Number,
    AmbCur: Number, //Ambulance availability
    numBeds: Number,
    partOf: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital"
        },
        name: String
    },
    handler:{
        id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
        },
        username:String
     }
});

module.exports = mongoose.model("HospAdmin", hospAdminSchema);