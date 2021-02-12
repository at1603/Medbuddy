let express = require("express");
const HospitalAdmin = require("../models/hospAdminSchema");
const BloodBank = require("../models/userHospModels/bloodBankSchema");
const Hospital = require("../models/hospSchema");
const Doctor = require("../models/docSchema");

const Appointment = require("../models/appointmentSchema");

var router = express.Router();

//----------Patient Routes--------------//

router.get("/userDocSection/consultDoc", function (req, res) {
  res.render("user/dashboards/patientDashboard.ejs");
});
//----X-----Patient Routes-------X------//

//----------Doctor Routes--------------//
router.get("/userDocSection/docDashboards", function (req, res) {
  Doctor.find()
    .where("handler.id")
    .equals(req.user._id)
    .exec(function (err, foundDoctor) {
      if (err) {
        console.log(err);
      } else {
        Appointment.find()
          .where("relation.docId")
          .equals(req.user._id)
          .exec(function (err, foundAppointments) {
            if (err) {
              console.log(err);
            } else {
              res.render("user/dashboards/docDashboard", {
                foundDoctor: foundDoctor,
                foundAppointments: foundAppointments,
              });
            }
          });
      }
    });
});

//----X-----Doctor Routes--------x-----//

//----------Hospital Admin Routes--------------//

router.get("/user/hospAdmin/dashboard", function (req, res) {
  Hospital.find()
    .where("handler.id")
    .equals(req.user._id)
    .exec(function (err, foundHosp) {
      if (err) {
        console.log(err);
      } else {
        HospitalAdmin.find()
          .where("handler.id")
          .equals(req.user._id)
          .exec(function (err, foundAdmin) {
            if (err) {
              console.log(err);
            } else {
              res.render("user/dashboards/hospAdminDashboard", {
                foundHosp: foundHosp,
                foundAdmin: foundAdmin,
              });
            }
          });
      }
    });
});

router.get("/dashboards/hospAdmin/profileIndex", function (req, res) {
  Hospital.find()
    .where("handler.id")
    .equals(req.user._id)
    .exec(function (err, foundHosp) {
      if (err) {
        console.log(err);
      } else {
        HospitalAdmin.find()
          .where("handler.id")
          .equals(req.user._id)
          .exec(function (err, foundAdmin) {
            if (err) {
              console.log(err);
            } else {
              res.render("user/profilePages/createProfileIndex", {
                foundHosp: foundHosp,
                foundAdmin: foundAdmin,
              });
            }
          });
      }
    });
});

router.get("/dashboards/hospAdmin/hospitalProfile", function (req, res) {
  res.render("user/profilePages/profileIndexPage/hospitalProfile");
});

router.get("/dashboards/hospAdmin/hospAdminProfile", function (req, res) {
  res.render("user/profilePages/profileIndexPage/hospAdminProfile");
});

router.get("/dashboards/hospAdmin/otheProfile", function (req, res) {
  res.render("user/profilePages/profileIndexPage/otherProfile");
});

////```````````Hospital Info post request`````````````///////

router.post("/dashboards/hospAdmin/hospitalProfile", function (req, res) {
  let newHosp = {
    name: req.body.hospName,
    type: req.body.type,
    speciality: req.body.speciality,
    contact: {
      email: req.body.email,
      phone: req.body.phone,
    },
    handler: {
      id: req.user._id,
      username: req.user.username,
    },
    address: {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    },
    about: req.body.aboutHosp,
  };

  Hospital.create(newHosp, function (err, newHospital) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/dashboards/hospAdmin/profileIndex");
    }
  });
});

////``````````````Hospital Admin Post request```````````````/////

router.post("/dashboards/hospAdmin/hospAdminProfile", function (req, res) {
  let newHospAdm = {
    oxyCur: req.body.oxyCur,
    ambCur: req.body.ambCur,
    numBeds: req.body.numBeds,
    partOf: req.body.hospId,
    handler: {
      id: req.user._id,
      username: req.user.username,
    },
    adminContact: {
      email: req.body.email,
      phone: req.body.phone,
    },
  };

  Hospital.findById(req.body.hospId, function (error, foundHosp) {
    if (error) {
      console.log(error);
    } else {
      HospitalAdmin.create(newHospAdm, function (err, newAdmin) {
        if (err) {
          console.log(err);
        } else {
          foundHosp.hasAdmin = true;
          res.redirect("/dashboards/hospAdmin/profileIndex");
        }
      });
    }
  });
});

// ---------Hospital Admin BloodBank, Ambulance, other routes -------------- //

router.post("/dashboards/hospAdmin/otheProfile/bloodbank", function (req, res) {
  let newBloodbank = {
    name: req.body.name,
    address: {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
    },
    relatedTo: req.body.hospId,
    maxcapacity: req.body.maxcapacity,
    currcapacity: {
      opos: req.body.opos,
      oneg: req.body.oneg,

      apos: req.body.apos,
      aneg: req.body.aneg,

      bpos: req.body.bpos,
      bneg: req.body.bneg,

      abpos: req.body.abpos,
      abneg: req.body.abneg,
    },
    handlerId: req.user._id,
    contact: {
      email: req.body.email,
      phone: req.body.phone,
    },
    price: req.body.price,
  };

  BloodBank.create(newBloodbank, function (err, createdBloodbank) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/dashboards/hospAdmin/profileIndex");
    }
  });
});

router.post(
  "/dashboards/hospAdmin/otheProfile/oxyAmbForm",
  function (req, res) {
    let newData = {
      //Schema pending.
    };
  }
);
// -----X----Hospital Admin BloodBank, Ambulance, other routes ------X-------- //

//-----------------Hospital, Other Profiles Update Routes-------------------//

router.get("/dashboards/hospAdmin/updateProfileIndex", function (req, res) {
  Hospital.find()
    .where("handler.id")
    .equals(req.user._id)
    .exec(function (err, foundHosp) {
      if (err) {
        console.log(err);
      } else {
        HospitalAdmin.find()
          .where("handler.id")
          .equals(req.user._id)
          .exec(function (err, foundAdmin) {
            if (err) {
              console.log(err);
            } else {
              res.render("user/profilePages/updateProfileIndex", {
                foundHosp: foundHosp,
                foundAdmin: foundAdmin,
              });
            }
          });
      }
    });
});

//--------------------------Hospital Update Routes ---------------------//
router.get("/dashboards/hospAdmin/updateHospitalProfile", function (req, res) {
  Hospital.find()
    .where("handler.id")
    .equals(req.user._id)
    .exec(function (err, foundHosp) {
      if (err) {
        console.log(err);
      } else {
        res.render("user/profilePages/updateProfilePages/updateHosp", {
          foundHosp: foundHosp,
        });
      }
    });
});

router.put(
  "/dashboards/hospAdmin/updateHospitalProfile/:id",
  function (req, res) {
    Hospital.findByIdAndUpdate(
      req.params.id,
      req.body.hosp,
      function (err, updateHospital) {
        if (err) {
          // req.flash("error", "Policy not found!")
          console.log(err);
          res.redirect("/dashboards/hospAdmin/updateHospitalProfile");
        } else {
          // req.flash("error", "Policy details succesfully updated!")
          res.redirect("/dashboards/hospAdmin/updateProfileIndex");
        }
      }
    );
  }
);
//------------X-------------Hospital Update Routes ---------X-----------//
//--------------------------Other Profiles Update Routes ---------------------//

router.get("/dashboards/hospAdmin/updateOtherProfile", function (req, res) {
  Hospital.find()
    .where("handler.id")
    .equals(req.user._id)
    .exec(function (err, foundHosp) {
      if (err) {
        console.log(err);
      } else {
        BloodBank.find()
          .where("handler.id")
          .equals(req.user.id)
          .exec(function (err, foundBloodBank) {
            res.render("user/profilePages/updateProfilePages/updateHosp", {
              foundHosp: foundHosp,
              foundBloodBank,
              foundBloodBank,
            });
          });
      }
    });
});

router.put(
  "/dashboards/hospAdmin/updateOtherProfile/bloodBank/:id",
  function (req, res) {
    BloodBank.findByIdAndUpdate(
      req.params.id,
      req.body.bloodBank,
      function (err, updateBloodBank) {
        if (err) {
          // req.flash("error", "Policy not found!")
          console.log(err);
          res.redirect("//dashboards/hospAdmin/updateHospitalProfile");
        } else {
          // req.flash("error", "Policy details succesfully updated!")
          res.redirect("//dashboards/hospAdmin/updateHospitalProfile");
        }
      }
    );
  }
);

//Schema needed.

// router.put("/dashboards/hospAdmin/updateOtherProfile/oxygenAmb/:id", function(req, res){
//     OxyAmb.findByIdAndUpdate(req.params.id, req.body.oxyAmb, function(err, updateOxyAmb){
//         if(err){
//             // req.flash("error", "Policy not found!")
//             console.log(err);
//             res.redirect("//dashboards/hospAdmin/updateHospitalProfile");
//         }else{
//             // req.flash("error", "Policy details succesfully updated!")
//             res.redirect("//dashboards/hospAdmin/updateHospitalProfile");
//         }
//      });
// });

//-------------X------------Other Profiles Update Routes ----------X----------//
//----------X------Hospital, Other Profiles Update Routes----------X--------//

//-----X----Hospital Admin Routes-------X------//

module.exports = router;
