var mongoose = require("mongoose");

var hospMngSchema = new mongoose.Schema({
    bBankCap: Number,  //Blood bank capacity
    bBankCurrent: Number,
    oxyCap: Number,
    oxyCur: Number,
    AmbCap: Number, //Ambulance capacity
    AmbCur: Number,  //Ambulance availability
    numBeds: Number,
    partOf: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospitals"
        },
        name:String
    },
    
});

module.exports = mongoose.model("hospManagement", hospMngSchema);