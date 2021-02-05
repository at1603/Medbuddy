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
    },
    handler:{
        id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
        },
        username:String
     }
});

module.exports = mongoose.model("Hospital", hospSchema);