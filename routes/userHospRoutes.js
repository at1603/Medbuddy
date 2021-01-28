let express = require("express");
let router = express.Router();

router.get("/userHospSection/initialPage", function (req, res) {
  res.render("userHospSection/index");
});

router.get("/userHospSection/bloodBanks", function(req, res){
  res.render("userHospSection/BloodBanks/index")
});

router.get("/userHospSection/organDonation", function(req, res){
  res.render("userHospSection/Organdonation/index")
});

router.get("/userHospSection/searchHospitals", function(req, res){
  res.render("userHospSection/searchHospitals/index")
});

module.exports = router;
