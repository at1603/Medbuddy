var express = require("express");
var router = express.Router();
const User = require("../models/userSchema");

router.get("/user/updateProfile", function(req, res) {
    // console.log("post in /register");
    res.render("user/updateUserProfile");

});

router.put("/user/updateProfile/:id", function(req, res) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, updateUser) {
        if (err) {
            // req.flash("error", "Policy not found!")
            console.log(err);
            res.send(404);
        } else {
            // req.flash("error", "Policy details succesfully updated!")
            console.log(updateUser);
            console.log(req.body);
            if (req.user.role == "patient")
                res.redirect("/userDocSection/patientDashboard");
            else if (req.user.role == "doctor")
                res.redirect("/userDocSection/docDashboards");
            else if (req.user.role == "hospAdmin")
                res.redirect("/user/hospAdmin/dashboard");
            else
                res.send(404);
        }
    });
});

module.exports = router;