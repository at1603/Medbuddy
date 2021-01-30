let mongoose = require("mongoose");

let bloodBankSchema = new mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String
    },
    relatedTo: {
        hospId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital"
        },
        default:null
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

module.exports = mongoose.model("BloodBank", bloodBankSchema);