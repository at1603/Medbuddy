var express = require("express");
var router = express.Router();
const User = require("../models/userSchema");
const PatientHistory = require("../models/patientHistorySchema");
const middleware = require("../middlewares/authMiddlewares");
const middlewareObj = require("../middlewares/authMiddlewares");

router.get("/user/updateProfile", function(req, res) {
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

// ------------------ Show Medical History GET Req-------------
router.get("/user/showMedicalHistoryList", middleware.isLoggedIn, function(req, res){
    PatientHistory.find().where("handlerId").equals(req.user._id).populate({
        path: "appointedDoctorId",
        select: "speciality",
        populate: { path: "handler_id", select: "firstName lastName" },
      }).exec(function(error, foundHistory){
        if(error){
            console.log(error);
        }else{
            res.render("userDocSection/patientfiles/patientHistoryList", {patientHistory: foundHistory});
        }
    });
});

// ----------------- Show Full Medical Report GET Req-----------
router.get("/user/showMedicalHisotryList/showFullReport/:docId", function(req, res){
    PatientHistory.findOne({"handlerId": req.user._id, "appointedDoctorId": req.params.docId}).populate({
        path: "appointedDoctorId",
        select: "speciality",
        populate: { path: "handler_id", select: "firstName lastName email" },
      }).exec(function(error, foundPatientHistory){
        if(error){
            console.log(error);
        }else{
            res.render("userDocSection/patientMedicalHistory", {patientHistory: foundPatientHistory});
        }
      });
});


module.exports = router;