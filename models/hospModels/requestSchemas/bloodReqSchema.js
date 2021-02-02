let mongoose = require('mongoose');

let bloodReqSchema = new mongoose.Schema({
    hospId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    },
    donarId: String,
    bloodGroup: String,
    email: String,
    action: String  //action can be 'DONATE' or 'REQUEST'
});



module.exports = mongoose.model("bloodReqSchema", bloodReqSchema);