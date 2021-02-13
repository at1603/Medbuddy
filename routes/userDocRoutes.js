var express = require("express");
var router = express.Router();

const Doctor = require("../models/docSchema");

////+++////

//Doctor routes
router.get("/userDocSection/createProfile", function (req, res) {
  res.render("userDocSection/docfiles/profile");
});

router.get("/userDocSection/patientList/:id", function (req, res) {
  res.render("userDocSection/docfiles/patientList");
});

router.get("/userDocSection/patientList/patientInfo/:id", function (req, res) {
  res.render("userDocSection/docfiles/patientInfo");
});

router.get("/userDocSection/reports/:id", function (req, res) {
  res.render("userDocSection/reports");
});

router.post("/sendEmail", (req, res) => {
  const Data = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    text: req.body.text,
  };

  sendMail(
    Data.name,
    Data.email,
    Data.subject,
    Data.text,
    function (err, data) {
      if (err) {
        res.status(500).json({ message: "Internal Error" });
      } else {
        res.redirect("/userDocSection/patientInfo");
        res.status({ message: "Email sent!!!" });
      }
    }
  );
});

router.get("/userDocSection/consultDoc/presc", function (req, res) {
  res.render("userDocSection/docfiles/prescription");
});

// -------------Doctor Profile Post Routes ------------------//

router.post("/userDocSection/createProfile", function (req, res) {
  let newDocPro = {
    speciality: req.body.speciality,
    workingAt: req.body.workingAt,
    workAtHosp: req.body.workAtHosp,
    timing: {
      timingFrom: req.body.timingFrom,
      timingTo: req.body.timingTo,
    },
    qual: req.body.qual,
    experience: req.body.experience,
    handler: {
      id: req.user._id,
      username: req.user.username,
    },
  };

  Doctor.create(newDocPro, function (err, newProfessionalDoc) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/userDocSection/checkPatients");
    }
  });
});

////+++////

//patient routes

router.get("/userDocSection/docList/:id", function (req, res) {
  res.render("userDocSection/patientfiles/docList");
});
router.get("/userDocSection/myDoc/docInfo/:id", function (req, res) {
  res.render("userDocSection/patientfiles/docinfo");
});

router.get("/userDocSection/myDoc", function (req, res) {
  res.render("userDocSection/patientfiles/myDoc");
});

router.get("/userDocSection/searchDoc", function (req, res) {
  res.render("userDocSection/searchDoc");
});

router.get("/userDocSection/prescrip/:id", function (req, res) {
  res.render("userDocSection/patientfiles/prescription");
});

////+++////

//universal routes
router.get("/userDocSection/appointments/:id", function (req, res) {
  res.render("userDocSection/appointments");
});

module.exports = router;
