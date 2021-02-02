let mongoose = require('mongoose')

let organReqSchema = new mongoose.Schema({
    donarId: String,
    age: Number,
    email: String,
    domicile: {
        city: String,
        state: String
    }
});

module.exports = mongoose.model('organReqSchema', organReqSchema)