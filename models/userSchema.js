var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
   firstName: String,
   lastName: String, 
   username: String,
   password: String,
   phone:String,
   email:String,
   avatar:String,
   address: {
       street: String,
       city: String,
       state: String,
       zip: Number,
   },
   role:String,
   gender:String,
   joinedAt:{type:Date, default:Date.now},
   isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);