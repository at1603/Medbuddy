let mongoose = require('mongoose');

let ambulanceReqSchema = new mongoose.Schema({
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
    bloodGroup: String,
    disease: String,
    age: Number,
    reason: String,
    instructions: String,
    date: String
});

module.exports = mongoose.model('ambulanceReqSchema', ambulanceReqSchema);