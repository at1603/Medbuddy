var express = require("express");
var router = express.Router();
var hospitalManagement = require("../models/hospMngSchema");

router.get("/hospHospSection/initialPage", function(req, res) {
    res.render("hospHospSection/index");
});

router.get("/hospHospSection/bloodBanks", function(req, res) {
    var bloodbanks = [{
            hospital_name: "XYZ",
            currcapacity: {
                opos: 3,
                oneg: 4,

                apos: 3,
                aneg: 6,

                bpos: 8,
                bneg: 3,

                abpos: 2,
                abneg: 7,
            },
            price: 4132,
            contact: "01938102839"
        }, {
            hospital_name: "XYZ",
            currcapacity: {
                opos: 3,
                oneg: 4,

                apos: 3,
                aneg: 6,

                bpos: 8,
                bneg: 3,

                abpos: 2,
                abneg: 7,
            },
            price: 4132,
            contact: "918239128379"
        }

    ];
    res.render("hospHospSection/Bloodbanks/index", { bloodbanks: bloodbanks })
});

router.get("/hospHospSection/organVault", function(req, res) {
    res.render("hospHospSection/Organvault/index")
});

router.get("/hospHospSection/oxygenBank", function(req, res) {
    hospitalManagement.find({}, function(err, allHospitals) {
        if (err)
            console.log(err);
        else
            res.render("hospHospSection/O2bank/index", { hospitals: allHospitals });
    });

});

router.get("/hospHospSection/ambulance", function(req, res) {
    var ambulances = [{
        hospital_name: "XYZ",
        car_id: "UP78DG3821",
        contact: "1012983091"
    }, {
        hospital_name: "ABC",
        car_id: "UP78BH1021",
        contact: "1012983091"
    }, {
        hospital_name: "XYZ",
        car_id: "UP72OP3912",
        contact: "1012983091"
    }];

    res.render("hospHospSection/Ambulance/index", { ambulances: ambulances })
});

module.exports = router;