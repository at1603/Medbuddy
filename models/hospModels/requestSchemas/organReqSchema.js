let mongoose = require('mongoose')

let organReqSchema = new mongoose.Schema({
    // hospId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Hospital"
    // },
    firstName: String,
    lastName: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
    },
    email: String,
    bloodGroup: String,
    disease: String,
    age: Number,
    organType: [String],
    isDonating: {type: Boolean, default: false},
    filledOn:{type:Date, default:Date.now}
});

module.exports = mongoose.model('organReqSchema', organReqSchema)