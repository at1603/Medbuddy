let mongoose = require('mongoose');

let bloodReqSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    email: String,
    pinCode: String,
    bloodGroup: String,
    disease: String,
    age: Number,
    units: Number,
    date: String
});



module.exports = mongoose.model("bloodReqSchema", bloodReqSchema);