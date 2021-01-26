var express = require("express");
var router = express.Router();

router.get("/userHospSection/initialPage", function (req, res) {
  res.render("userHospSection/index");
});

router.get("/userHospSection/bloodBanks", function(req, res){
  res.render("userHospSection/BloodBanks/index")
});

module.exports = router;
