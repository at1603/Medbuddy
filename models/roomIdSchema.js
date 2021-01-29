var mongoose = require("mongoose");

var roomIdSchema = new mongoose.Schema({

    roomId:{type: String, default: null}

});


module.exports = mongoose.model("roomId", roomIdSchema);