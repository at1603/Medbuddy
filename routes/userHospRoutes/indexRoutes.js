let express = require("express");
const middlewareObj = require("../../middlewares/authMiddlewares");
let router = express.Router();
middleware = require("../../middlewares/authMiddlewares");

const Hospital = require("../../models/hospSchema");

router.get("/userHospSection/initialPage", middleware.isLoggedIn, function (req, res) {
  res.render("userHospSection/index");
});

router.get("/userHospSection/bloodBanks", middleware.isLoggedIn, function(req, res){
  res.render("userHospSection/BloodBanks/index", {flag: 0})
});

router.get("/userHospSection/organDonation", middleware.isLoggedIn, function(req, res){
  res.render("userHospSection/Organdonation/index" ,{flag: 0});
});

router.get("/userHospSection/searchHospitals/findHospitals", middleware.isLoggedIn, function(req, res){
  res.render("userHospSection/searchHospitals/findHosps", {flag: 0});
});

router.post("/userHospSection/searchHospitals/findHospitals", middleware.isLoggedIn, function(req, res){
  Hospital.find({"address.state": req.body.state, "address.city": req.body.city}, function(err, foundHospitals){
    if(err){
      console.log(err);
    }else{
      res.render("userHospSection/searchHospitals/findHosps", {flag: 1, foundHospitals: foundHospitals});
    }
  });
});

module.exports = router;
