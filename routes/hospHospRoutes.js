var express = require("express");
var router = express.Router();

router.get("/hospHospSection/initialPage", function(req, res) {
    res.render("hospHospSection/index");
});

router.get("/hospHospSection/bloodBanks", function(req, res) {
    res.render("hospHospSection/Bloodbanks/index")
});

router.get("/hospHospSection/organVault", function(req, res) {
    res.render("hospHospSection/Organvault/index")
});

router.get("/hospHospSection/oxygenBank", function(req, res) {
    res.render("hospHospSection/Oxygenbank/index")
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