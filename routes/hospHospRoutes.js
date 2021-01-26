var express = require("express");
var router = express.Router();

router.get("/consultDoc", function (req, res) {
  res.render("hospHospSection/index");
});

module.exports = router;
