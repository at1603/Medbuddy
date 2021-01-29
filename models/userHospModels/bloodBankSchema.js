let mongoose = require("mongoose");

let bloodBankSchema = new mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String
    },
    relatedTo: {
        type: String,
        default: 'true'
    },
    maxcapacity: Number,
    currcapacity: {
        opos: Number,
        oneg: Number,

        apos: Number,
        aneg: Number,

        bpos: Number,
        bneg: Number,

        abpos: Number,
        abneg: Number,
    },
    price: Number
});

module.exports = mongoose.model("bloodBank", bloodBankSchema);