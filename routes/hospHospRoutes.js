var express = require("express");
var router = express.Router();
var hospitalAdministration = require("../models/hospAdminSchema");
var _ = require('lodash');

router.get("/hospHospSection/bloodBank", function(req, res) {
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
    // hospitalManagement.find({}, function(err, allHospitals) {
    //     if (err)
    //         console.log(err);
    //     else
    //         res.render("hospHospSection/O2bank/index", { hospitals: allHospitals });
    // });
    var oxygen = [{
        hospital_name: "XYZ",
        oxyCur: 12,
        contact: "65465423321"
    }, {
        hospital_name: "ABC",
        oxyCur: 45,
        contact: "65465654"
    }, {
        hospital_name: "PQR",
        oxyCur: 29,
        contact: "546546896"
    }];
    res.render("hospHospSection/O2bank/index", { oxygen: oxygen })

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

router.get("/hospHospSection/:service/request", function(req, res) {
    res.render("hospHospSection/request", { service: _.startCase(req.params.service) });
})

module.exports = router;