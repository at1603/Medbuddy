let express = require("express");

var router = express.Router();

//----------Patient Routes--------------//
router.get("/userDocSection/consultDocs", function (req, res) {
  res.render("user/dashboards/patientDashboard.ejs");
});
//----X-----Patient Routes-------X------//

//----------Doctor Routes--------------//
router.get("/userDocSection/checkPatients", function (req, res) {
  res.render("user/dashboards/docDashboard.ejs");
});
//----X-----Doctor Routes--------x-----//

//----------Hospital Admin Routes--------------//

// router.get("/hospHospSection/initialPage", function(req, res) {
//     res.render("hospHospSection/index");
// });

//-----X----Hospital Admin Routes-------X------//

module.exports = router;
