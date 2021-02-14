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
        ref: "Hospital",
        default: null
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
    handlerId:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"HospAdmin"
     },
    contact: {
        email: String,
        phone: Number
    },
    price: Number
});

module.exports = mongoose.model("BloodBank", bloodBankSchema);