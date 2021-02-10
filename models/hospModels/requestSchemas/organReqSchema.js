let mongoose = require('mongoose')

let organReqSchema = new mongoose.Schema({
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
    organs: Array,
    date: String
});

module.exports = mongoose.model('organReqSchema', organReqSchema)