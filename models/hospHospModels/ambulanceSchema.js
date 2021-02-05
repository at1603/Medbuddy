let mongoose = require("mongoose");

let ambulanceSchema = new mongoose.Schema({
    car_id: String,
    relatedTo: {
        hospId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital"
        },
        default: null
    }
});

module.exports = mongoose.model("Ambulance", ambulanceSchema);