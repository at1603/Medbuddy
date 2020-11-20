var mongoose = require("mongoose");

var hospSchema = new mongoose.Schema({
    name: String,
    type: String,
    speciality: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    }
});

module.exports = mongoose.model("Hospitals", hospSchema);