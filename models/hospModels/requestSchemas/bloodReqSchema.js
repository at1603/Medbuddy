let mongoose = require('mongoose');

let bloodReqSchema = new mongoose.Schema({
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
    units: Number
});



module.exports = mongoose.model("bloodReqSchema", bloodReqSchema);