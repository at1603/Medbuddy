let express = require("express");
let router = express.Router();

router.get("/userHospitalSection/searchHospitals/findBeds", function(req, res){
    res.render("userHospSection/searchHospitals/lookForBeds")
});

module.exports = router;