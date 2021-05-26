let mongoose = require('mongoose');

let eyesSchema = new mongoose.Schema({
    hospital: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital"
        },
    },
    date: String,
    donorAge: Number,
    type: String,
    isEmergency: {type: Boolean, default: false}
});

module.exports = mongoose.model('eyesSchema', eyesSchema)