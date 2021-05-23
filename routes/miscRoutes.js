var express = require("express");
var router = express.Router();
const User = require("../models/userSchema");
const PatientHistory = require("../models/patientHistorySchema");
const Appointment = require("../models/appointmentSchema");
const DoctorStats = require("../models/statsSchema/doctorStatsSchema");
const Doctor = require("../models/docSchema");
const middleware = require("../middlewares/authMiddlewares");
const middlewareObj = require("../middlewares/authMiddlewares");
const { route } = require("./userDocRoutes");
const sendMail = require("../public/jsFiles/mail");

router.get("/user/updateProfile", function (req, res) {
  res.render("user/updateUserProfile");
});

router.put("/user/updateProfile/:id", function (req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    function (err, updateUser) {
      if (err) {
        // req.flash("error", "Policy not found!")
        console.log(err);
        res.send(404);
      } else {
        // req.flash("error", "Policy details succesfully updated!")
        if (req.user.role == "patient")
          res.redirect("/userDocSection/patientDashboard");
        else if (req.user.role == "doctor")
          res.redirect("/userDocSection/docDashboards");
        else if (req.user.role == "hospAdmin")
          res.redirect("/user/hospAdmin/dashboard");
        else res.send(404);
      }
    }
  );
});

// ------------------ Show Medical History GET Req-------------
router.get(
  "/user/showMedicalHistoryList",
  middleware.isLoggedIn,
  function (req, res) {
    PatientHistory.find()
      .where("handlerId")
      .equals(req.user._id)
      .populate({
        path: "appointedDoctorId",
        select: "speciality",
        populate: { path: "handler_id", select: "firstName lastName" },
      })
      .exec(function (error, foundHistory) {
        if (error) {
          console.log(error);
        } else {
          res.render("userDocSection/patientfiles/patientHistoryList", {
            patientHistory: foundHistory,
          });
        }
      });
  }
);

// ----------------- Show Full Medical Report GET Req-----------
router.get(
  "/user/showMedicalHisotryList/showFullReport/:docId",
  function (req, res) {
    PatientHistory.findOne({
      handlerId: req.user._id,
      appointedDoctorId: req.params.docId,
    })
      .populate({
        path: "appointedDoctorId",
        select: "speciality",
        populate: { path: "handler_id", select: "firstName lastName email" },
      })
      .exec(function (error, foundPatientHistory) {
        if (error) {
          console.log(error);
        } else {
          res.render("userDocSection/patientMedicalHistory", {
            patientHistory: foundPatientHistory,
          });
        }
      });
  }
);

// ------------------- Review routes -------------------------
router.post(
  "/review/setReview/:docId/:appointId/:doctorUserId",
  function (req, res) {
    Appointment.findOneAndUpdate(
      {
        patientId: req.user._id,
        docId: req.params.docId,
        _id: req.params.appointId,
      },
      { $inc: { review: req.body.review } },
      function (err, updatedAppointment) {
        if (err) {
          console.log(err);
        } else {
          DoctorStats.findOne(
            { handlerId: req.params.doctorUserId },
            function (err, foundData) {
              if (err) {
                console.log(err);
              } else {
                let changeData =
                  Number(
                    foundData.rating * (foundData.appointment - 1) +
                      Number(req.body.review)
                  ) / foundData.appointment;
                DoctorStats.updateOne(
                  { handlerId: req.params.doctorUserId },
                  { $set: { rating: changeData } },
                  function (error, updatedData) {
                    if (error) {
                      console.log(error);
                    } else {
                      Doctor.findOneAndUpdate(
                        { handler_id: req.params.doctorUserId },
                        { $set: { rating: changeData } },
                        function (err, updatedDoctorData) {
                          if (err) {
                            console.log(err);
                          } else {
                            PatientHistory.findOneAndUpdate(
                              {
                                handlerId: req.user._id,
                                appointedDoctorId: req.params.docId,
                                "prescription.appointmentId":
                                  req.params.appointId,
                              },
                              {
                                $set: {
                                  "prescription.$.review": req.body.review,
                                },
                              },
                              function (error, foundPatientHistory) {
                                if (error) {
                                  console.log(error);
                                } else {
                                  const foundPrescription =
                                    foundPatientHistory.prescription.filter(
                                      (item) =>
                                        item.appointmentId ==
                                        req.params.appointId
                                    );
                                  foundPrescription[0].review = req.body.review;
                                  res.redirect("/user/showMedicalHistoryList");
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
);
// ...................................Contact US route.......................................
router.post("/userDocSection/contactUs", function (req, res) {
  const message = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  sendMail.sendContactUsMail(message, function (err) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Email Sent!");
      res.redirect("/contact");
    }
  });
});
module.exports = router;
