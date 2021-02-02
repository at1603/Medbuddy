var mongoose = require("mongoose");

var hospMngSchema = new mongoose.Schema({
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

});

module.exports = mongoose.model("HospManagement", hospMngSchema);