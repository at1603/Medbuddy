let mongoose = require('mongoose');

let ambulanceReqSchema = new mongoose.Schema({
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
    pinCode: String,
    email: String,
    bloodGroup: String,
    disease: String,
    age: Number,
    reason: String,
    instructions: String,
    date: String,
    isEmergengency: {type: Boolean, default: false}
});

module.exports = mongoose.model('ambulanceReqSchema', ambulanceReqSchema);