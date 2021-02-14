let mongoose = require('mongoose');

let oxygenReqSchema = new mongoose.Schema({
    hospId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    pinCode: String,
    email: String,
    bloodGroup: String,
    disease: String,
    age: Number,
    qty: Number,
    date: String
});

module.exports = mongoose.model('oxygenReqSchema', oxygenReqSchema);