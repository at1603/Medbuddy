let mongoose = require('mongoose');

let pancreasSchema = new mongoose.Schema({
    hospital: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital"
        },
    },
    date: String,
    donorAge: Number,
});

module.exports = mongoose.model('pancreasSchema', pancreasSchema)