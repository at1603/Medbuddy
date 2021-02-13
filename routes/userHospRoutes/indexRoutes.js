let express = require("express");
let router = express.Router();
middleware = require("../../middlewares/authMiddlewares")

router.get("/userHospSection/initialPage", function (req, res) {
  res.render("userHospSection/index");
});

router.get("/userHospSection/bloodBanks", function(req, res){
  res.render("userHospSection/BloodBanks/index", {flag: 0})
});

router.get("/userHospSection/organDonation", middleware.isLoggedIn, function(req, res){
  res.render("userHospSection/Organdonation/index" ,{flag: 0});
});

router.get("/userHospSection/searchHospitals", function(req, res){
  res.render("userHospSection/searchHospitals/index")
});

module.exports = router;
