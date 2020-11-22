var mongoose = require("mongoose");

var roomIdSchema = new mongoose.Schema({

    roomId:String

});



    module.exports = mongoose.model("roomId", roomIdSchema);