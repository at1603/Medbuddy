const express = require("express");
const router = express.Router();
const HospAdmin = require("../models/hospAdminSchema");
const BloodBank = require("../models/userHospModels/bloodBankSchema");
const Hospital = require("../models/hospSchema");
const bloodReqSchema = require("../models/hospModels/requestSchemas/bloodReqSchema");
const oxygenReqSchema = require("../models/hospModels/requestSchemas/oxygenReqSchema");
const organReqSchema = require("../models/hospModels/requestSchemas/organReqSchema");
const ambulanceReqSchema = require("../models/hospModels/requestSchemas/ambulanceReqSchema");
const _ = require('lodash');

router.get("/hospHospSection/bloodBank", function(req, res) {
    BloodBank.find(function(err, bloodbanks) {
        if (err)
            console.log(err);
        else {
            console.log("All the bloodbanks");
            let hospitals = [];
            for (let i = 0; i < bloodbanks.length; i++) {
                Hospital.findById(bloodbanks[i].relatedTo, function(err, foundHospital) {
                    if (err)
                        console.log(err);
                    else {
                        hospitals.push(foundHospital);
                        res.render("hospHospSection/Bloodbanks/index", { bloodbanks: bloodbanks, hospitals: hospitals });
                    }
                });
            }
        }
    });
});

router.get("/hospHospSection/organVault", function(req, res) {
    var organs = [{
        hospital_name: "XYZ",
        date: "2021-02-01",
        donor_age: 23,
        type: "liver",
        contact: "65465423321"
    }, {
        hospital_name: "ABC",
        date: "2021-01-28",
        donor_age: 43,
        type: "kidney",
        contact: "65465654"
    }, {
        hospital_name: "XYZ",
        date: "2021-01-30",
        donor_age: 35,
        type: "heart",
        contact: "546546896"
    }];
    res.render("hospHospSection/Organvault/index", { organs: organs });
});

router.get("/hospHospSection/oxygenBank", function(req, res) {
    // var oxygen = [{
    //     hospital_name: "XYZ",
    //     oxyCur: 12,
    //     contact: "65465423321"
    // }, {
    //     hospital_name: "ABC",
    //     oxyCur: 45,
    //     contact: "65465654"
    // }, {
    //     hospital_name: "PQR",
    //     oxyCur: 29,
    //     contact: "546546896"
    // }];
    HospAdmin.find(function(err, hospitalAdmins) {
        if (err)
            console.log(err);
        else {
            let hospitals = [];
            for (let i = 0; i < hospitalAdmins.length; i++) {
                Hospital.findById(hospitalAdmins[i].partOf, function(err, foundHospital) {
                    if (err)
                        console.log(err);
                    else {
                        hospitals.push(foundHospital);
                        res.render("hospHospSection/O2bank/index", { hospitalAdmins: hospitalAdmins, hospitals: hospitals });
                    }
                });
            }
        }
    });

});

router.get("/hospHospSection/ambulance", function(req, res) {
    // var ambulances = [{
    //     hospital_name: "XYZ",
    //     car_id: "UP78DG3821",
    //     contact: "1012983091"
    // }, {
    //     hospital_name: "ABC",
    //     car_id: "UP78BH1021",
    //     contact: "1012983091"
    // }, {
    //     hospital_name: "XYZ",
    //     car_id: "UP72OP3912",
    //     contact: "1012983091"
    // }];
    HospAdmin.find(function(err, hospitalAdmins) {
        if (err)
            console.log(err);
        else {
            let hospitals = [];
            for (let i = 0; i < hospitalAdmins.length; i++) {
                Hospital.findById(hospitalAdmins[i].partOf, function(err, foundHospital) {
                    if (err)
                        console.log(err);
                    else {
                        hospitals.push(foundHospital);
                        res.render("hospHospSection/Ambulance/index", { hospitalAdmins: hospitalAdmins, hospitals: hospitals });
                    }
                });
            }
        }
    });

});

//All request form routes
router.get("/hospHospSection/:service/specificRequest",middleware.isLoggedIn, function(req, res) {
    res.render("hospHospSection/request", { service: _.startCase(req.params.service) });
});


//4 Answer Page routes
router.get("/hospHospSection/bloodBank/answer", function(req, res) {
    // let requests = [{
    //     hospitalName: "XYZ",
    //     date: "2021-02-01",
    //     donorAge: 23,
    //     bloodGroup: "A+",
    //     contact: "6546542332"
    // }, {
    //     hospitalName: "ABC",
    //     date: "2021-01-28",
    //     donorAge: 43,
    //     bloodGroup: "AB-",
    //     contact: "65465654"
    // }, {
    //     hospitalName: "XYZ",
    //     date: "2021-01-30",
    //     donorAge: 35,
    //     bloodGroup: "B+",
    //     contact: "546546896"
    // }]
    bloodReqSchema.find(function(err, allBloodReq) {
        if (err)
            console.log(err);
        else {
            res.render("hospHospSection/Bloodbanks/answer", { requests: allBloodReq });
        }

    });
});

router.get("/hospHospSection/organVault/answer",middleware.isLoggedIn, function(req, res) {
    organReqSchema.find(function(err, allOrganReq) {
        if (err)
            console.log(err);
        else
            res.render("hospHospSection/Organvault/answer", { requests: allOrganReq });

    });
});


router.get("/hospHospSection/oxygenBank/answer",middleware.isLoggedIn, function(req, res) {
    oxygenReqSchema.find(function(err, allOxygenReq) {
        if (err)
            console.log(err);
        else
            res.render("hospHospSection/O2bank/answer", { requests: allOxygenReq });

    });
});

router.get("/hospHospSection/ambulance/answer", function(req, res) {
    ambulanceReqSchema.find(function(err, allAmbulanceReq) {
        if (err)
            console.log(err);
        else
            res.render("hospHospSection/Ambulance/answer", { requests: allAmbulanceReq });

    });
});

router.post("/hospHospSection/:service/requests", middleware.isLoggedIn, function(req, res) {
    //----------------Get today date----------------------
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    // --------------------------------------
    if (req.params.service == "bloodbank") {
        bloodReqSchema.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pinCode: req.body.pinCode,
            email: req.user.email,
            bloodGroup: req.body.bloodGroup,
            disease: req.body.diseaseDescription,
            age: req.body.age,
            units: req.body.units,
            date: today,
            adminId: req.user._id
        }, function(err, bloodReq) {
            if (err)
                console.log(err)
            else
                console.log(bloodReq);
        });
    } else if (req.params.service == "oxygenbank") {
        oxygenReqSchema.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pinCode: req.body.pinCode,
            email: req.user.email,
            bloodGroup: req.body.bloodGroup,
            disease: req.body.diseaseDescription,
            age: req.body.age,
            qty: req.body.qty,
            date: today,
            adminId: req.user._id
        }, function(err, oxygenReq) {
            if (err)
                console.log(err)
            else
                console.log("Oxygen Request Made! ");
        });
    } else if (req.params.service == "organvault") {
        organReqSchema.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: {
                street: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.pinCode,
            },
            email: req.user.email,
            bloodGroup: req.body.bloodGroup,
            disease: req.body.diseaseDescription,
            age: req.body.age,
            organType: req.body.organs,
            adminId: req.user._id
        }, function(err, organReq) {
            if (err)
                console.log(err)
            else
                console.log("Organ Request Made");
        });
    } else if (req.params.service == "ambulance") {
        ambulanceReqSchema.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            email: req.user.email,
            pinCode: req.body.pinCode,
            bloodGroup: req.body.bloodGroup,
            disease: req.body.diseaseDescription,
            age: req.body.age,
            reason: req.body.reason,
            instructions: req.body.instructions,
            date: today,
            adminId: req.user._id
        }, function(err, ambulanceReq) {
            if (err)
                console.log(err)
            else
                console.log(ambulanceReq);
        });
    }
    res.redirect("/hospHospSection/initialPage");
});
module.exports = router;