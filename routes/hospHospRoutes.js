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

router.get("/hospHospSection/ambulance", function(req, res) {
    res.render("hospHospSection/Ambulance/index")
});

module.exports = router;