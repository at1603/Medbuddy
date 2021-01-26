var express = require("express");
var router = express.Router();

router.get("/manageHosp", function (req, res) {
  res.render("userHospSection/index");
});

router.get("/prescription", function (req, res) {
  res.render("userHospSection/index", { str: "prescription" });
});

module.exports = router;
