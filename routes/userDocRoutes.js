var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;
const Doctor = require("../models/docSchema");
const User = require("../models/userSchema");
const Appointment = require("../models/appointmentSchema");
const PatientHistory = require("../models/patientHistorySchema");

const sendPrescriptionMail = require("../public/jsFiles/mail");
const DoctorStats = require("../models/statsSchema/doctorStatsSchema");
const PatientStats = require("../models/statsSchema/patientStatsSchema");
const middleware = require("../middlewares/authMiddlewares");
////+++////

//Doctor routes

router.get("/generatePresc/:id", middleware.isLoggedIn, function (req, res) {
  User.findById(req.params.id, function (err, foundPatient) {
    if (err) {
      console.log(err);
      req.flash("error", "Something went wrong");
      res.redirect("/userDocSection/patientList");
    } else {
      User.find({ _id: ObjectId(req.user._id) }).exec(function (
        err,
        doctorDetails
      ) {
        if (err) {
          console.log(err);
        } else {
          Doctor.find({ handler_id: ObjectId(req.user._id) }).exec(function (
            err,
            doctorProfessionalDetails
          ) {
            if (err) {
              console.log(err);
            } else {
              Appointment.find(
                { patientId: ObjectId(req.params.id), activityStatus: true },
                { age: 1 }
              ).exec(function (err, age) {
                if (err) {
                  console.log(err);
                } else {
                  res.render("userDocSection/docfiles/prescription", {
                    foundPatient: foundPatient,
                    doctorDetails: doctorDetails,
                    date: Date(),
                    prescriptionNo: Date.now(),
                    doctorProfessionalDetails: doctorProfessionalDetails,
                    age: age,
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});
router.get("/userDocSection/doctor/createProfile", middleware.isLoggedIn, function (req, res) {
  Doctor.findOne()
    .where("handler_id")
    .equals(req.user._id)
    .exec(function (err, foundDoctorData) {
      if (err) {
        console.log(err);
      } else {
        res.render("userDocSection/docfiles/profile", {
          foundData: foundDoctorData,
        });
      }
    });
});

router.get("/userDocSection/patientList", middleware.isLoggedIn, function (req, res) {
  Doctor.find(
    { handler_id: ObjectId(req.user._id) },
    { _id: 1 },
    function (err, foundDocId) {
      if (err) {
        console.log(err);
        req.flash("error", "No Patient Found");
        res.redirect("/userDocSection/docDashboard");
      } else {
        Appointment.find({
          docId: ObjectId(foundDocId[0]._id),
          activityStatus: true,
        })
          .populate("patientId")
          .exec(function (err, foundPatients) {
            if (err) {
              console.log(err);
            } else {
              res.render("userDocSection/docfiles/patientList", {
                patients: foundPatients,
              });
            }
          });
      }
    }
  );
});

router.get("/userDocSection/patientList/patientInfo/:id", middleware.isLoggedIn, function (req, res) {
  User.findById(req.params.id, function (err, foundPatient) {
    if (err) {
      console.log(err);
      req.flash("error", "Something went wrong");
      res.redirect("/userDocSection/patientList");
    } else {
      Doctor.find(
        { handler_id: ObjectId(req.user._id) },
        { _id: 1 },
        function (err, foundDocId) {
          if (err) {
            console.log(err);
            req.flash("error", "No Patient Found");
            res.redirect("/userDocSection/docDashboard");
          } else {
            PatientHistory.find({
              handlerId: req.params.id,
              appointedDoctorId: foundDocId[0]._id,
            }).exec(function (err, foundPatientMedicalRecords) {
              if (err) {
                console.log(err);
              } else {
                Appointment.findOne(
                  {
                    patientId: req.params.id,
                    docId: foundDocId[0]._id,
                    activityStatus: true,
                  },
                  function (err, foundAppointment) {
                    if (err) {
                      console.log(err);
                    } else {
                      res.render("userDocSection/docfiles/patientInfo", {
                        foundDocId: foundDocId,
                        foundPatient: foundPatient,
                        foundPatientMedicalRecords: foundPatientMedicalRecords,
                        foundAppointment: foundAppointment,
                      });
                    }
                  }
                );
              }
            });
          }
        }
      );
    }
  });
});

router.get("/userDocSection/reports/:id", middleware.isLoggedIn, function (req, res) {
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

router.get("/userDocSection/consultDoc/presc", middleware.isLoggedIn, function (req, res) {
  res.render("userDocSection/docfiles/prescription");
});

// -------------Doctor Profile Post Routes ------------------//

router.put("/userDocSection/createProfile", middleware.isLoggedIn, function (req, res) {
  // res.sendStatus(200);
  Doctor.updateOne(
    { handler_id: ObjectId(req.user._id) },
    req.body.doctor,
    function (err, newProfessionalDoc) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/userDocSection/docDashboard");
      }
    }
  );
});

////+++////

//patient routes

//all doctors
router.get("/userDocSection/docList/", middleware.isLoggedIn, function (req, res) {
  Doctor.find()
    .populate("handler_id", "firstName lastName")
    .exec(function (err, foundDoctors) {
      if (err) {
        console.log(err);
      } else {
        PatientHistory.find()
          .where("handlerId")
          .equals(req.user._id)
          .select("currentDoctorId")
          .exec(function (error, foundHistory) {
            if (error) console.log(error);
            else {
              res.render("userDocSection/patientfiles/docList", {
                doctors: foundDoctors,
                patientHistory: foundHistory,
              });
            }
          });
      }
    });
});

router.get("/userDocSection/docList/docInfo/:id", middleware.isLoggedIn, function (req, res) {
  Doctor.findById(req.params.id)
    .populate("handler_id")
    .exec(function (err, foundDoctor) {
      if (err) {
        console.log(err);
      } else {
        var minutesA =
          Number(foundDoctor.timing.morning.timingTo.slice(0, 2)) * 60 +
          Number(foundDoctor.timing.morning.timingTo.slice(3)) -
          (Number(foundDoctor.timing.morning.timingFrom.slice(0, 2)) * 60 +
            Number(foundDoctor.timing.morning.timingFrom.slice(3)));
        var minutesB =
          Number(foundDoctor.timing.evening.timingTo.slice(0, 2)) * 60 +
          Number(foundDoctor.timing.evening.timingTo.slice(3)) -
          (Number(foundDoctor.timing.evening.timingFrom.slice(0, 2)) * 60 +
            Number(foundDoctor.timing.evening.timingFrom.slice(3)));

        var slotAa =
          (~~(
            (Number(foundDoctor.timing.morning.timingFrom.slice(0, 2)) * 60 +
              Number(foundDoctor.timing.morning.timingFrom.slice(3)) +
              ~~(minutesA / 4)) /
            60
          ) >= 10
            ? ~~(
              (Number(foundDoctor.timing.morning.timingFrom.slice(0, 2)) *
                60 +
                Number(foundDoctor.timing.morning.timingFrom.slice(3)) +
                ~~(minutesA / 4)) /
              60
            )
            : "0" +
            ~~(
              (Number(foundDoctor.timing.morning.timingFrom.slice(0, 2)) *
                60 +
                Number(foundDoctor.timing.morning.timingFrom.slice(3)) +
                ~~(minutesA / 4)) /
              60
            )) +
          ":" +
          ((Number(foundDoctor.timing.morning.timingFrom.slice(0, 2)) * 60 +
            Number(foundDoctor.timing.morning.timingFrom.slice(3)) +
            ~~(minutesA / 4)) %
            60 >=
            10
            ? (Number(foundDoctor.timing.morning.timingFrom.slice(0, 2)) * 60 +
              Number(foundDoctor.timing.morning.timingFrom.slice(3)) +
              ~~(minutesA / 4)) %
            60
            : "0" +
            ((Number(foundDoctor.timing.morning.timingFrom.slice(0, 2)) * 60 +
              Number(foundDoctor.timing.morning.timingFrom.slice(3)) +
              ~~(minutesA / 4)) %
              60));

        var slotAb =
          (~~(
            (Number(slotAa.slice(0, 2)) * 60 +
              Number(slotAa.slice(3)) +
              ~~(minutesA / 4)) /
            60
          ) >= 10
            ? ~~(
              (Number(slotAa.slice(0, 2)) * 60 +
                Number(slotAa.slice(3)) +
                ~~(minutesA / 4)) /
              60
            )
            : "0" +
            ~~(
              (Number(slotAa.slice(0, 2)) * 60 +
                Number(slotAa.slice(3)) +
                ~~(minutesA / 4)) /
              60
            )) +
          ":" +
          ((Number(slotAa.slice(0, 2)) * 60 +
            Number(slotAa.slice(3)) +
            ~~(minutesA / 4)) %
            60 >=
            10
            ? (Number(slotAa.slice(0, 2)) * 60 +
              Number(slotAa.slice(3)) +
              ~~(minutesA / 4)) %
            60
            : "0" +
            ((Number(slotAa.slice(0, 2)) * 60 +
              Number(slotAa.slice(3)) +
              ~~(minutesA / 4)) %
              60));

        var slotAc =
          (~~(
            (Number(slotAb.slice(0, 2)) * 60 +
              Number(slotAb.slice(3)) +
              ~~(minutesA / 4)) /
            60
          ) >= 10
            ? ~~(
              (Number(slotAb.slice(0, 2)) * 60 +
                Number(slotAb.slice(3)) +
                ~~(minutesA / 4)) /
              60
            )
            : "0" +
            ~~(
              (Number(slotAb.slice(0, 2)) * 60 +
                Number(slotAb.slice(3)) +
                ~~(minutesA / 4)) /
              60
            )) +
          ":" +
          ((Number(slotAb.slice(0, 2)) * 60 +
            Number(slotAb.slice(3)) +
            ~~(minutesA / 4)) %
            60 >=
            10
            ? (Number(slotAb.slice(0, 2)) * 60 +
              Number(slotAb.slice(3)) +
              ~~(minutesA / 4)) %
            60
            : "0" +
            ((Number(slotAb.slice(0, 2)) * 60 +
              Number(slotAb.slice(3)) +
              ~~(minutesA / 4)) %
              60));
        var slotBa =
          ~~(
            (Number(foundDoctor.timing.evening.timingFrom.slice(0, 2)) * 60 +
              Number(foundDoctor.timing.evening.timingFrom.slice(3)) +
              ~~(minutesB / 4)) /
            60
          ) +
          ":" +
          ((Number(foundDoctor.timing.evening.timingFrom.slice(0, 2)) * 60 +
            Number(foundDoctor.timing.evening.timingFrom.slice(3)) +
            ~~(minutesB / 4)) %
            60 >=
            10
            ? (Number(foundDoctor.timing.evening.timingFrom.slice(0, 2)) * 60 +
              Number(foundDoctor.timing.evening.timingFrom.slice(3)) +
              ~~(minutesB / 4)) %
            60
            : "0" +
            ((Number(foundDoctor.timing.evening.timingFrom.slice(0, 2)) * 60 +
              Number(foundDoctor.timing.evening.timingFrom.slice(3)) +
              ~~(minutesB / 4)) %
              60));
        var slotBb =
          ~~(
            (Number(slotBa.slice(0, 2)) * 60 +
              Number(slotBa.slice(3)) +
              ~~(minutesB / 4)) /
            60
          ) +
          ":" +
          ((Number(slotBa.slice(0, 2)) * 60 +
            Number(slotBa.slice(3)) +
            ~~(minutesB / 4)) %
            60 >=
            10
            ? (Number(slotBa.slice(0, 2)) * 60 +
              Number(slotBa.slice(3)) +
              ~~(minutesB / 4)) %
            60
            : "0" +
            ((Number(slotBa.slice(0, 2)) * 60 +
              Number(slotBa.slice(3)) +
              ~~(minutesB / 4)) %
              60));
        var slotBc =
          ~~(
            (Number(slotBb.slice(0, 2)) * 60 +
              Number(slotBb.slice(3)) +
              ~~(minutesB / 4)) /
            60
          ) +
          ":" +
          ((Number(slotBb.slice(0, 2)) * 60 +
            Number(slotBb.slice(3)) +
            ~~(minutesB / 4)) %
            60 >=
            10
            ? (Number(slotBb.slice(0, 2)) * 60 +
              Number(slotBb.slice(3)) +
              ~~(minutesB / 4)) %
            60
            : "0" +
            ((Number(slotBb.slice(0, 2)) * 60 +
              Number(slotBb.slice(3)) +
              ~~(minutesB / 4)) %
              60));

        let slotTime = {
          slotAa: slotAa,
          slotAb: slotAb,
          slotAc: slotAc,
          slotBa: slotBa,
          slotBb: slotBb,
          slotBc: slotBc,
        };
        res.render("userDocSection/patientfiles/takeAppointment", {
          doctors: foundDoctor,
          slotTime: slotTime,
        });
      }
    });
});

//my doctor

router.get("/userDocSection/myAppointments", middleware.isLoggedIn, function (req, res) {
  Appointment.find({})
    .where("patientId")
    .equals(req.user._id)
    .populate({
      path: "docId",
      select: "speciality",
      populate: { path: "handler_id", select: "firstName lastName" },
    })
    .exec(function (err, foundAppointments) {
      if (err) {
        console.log(err);
      } else {
        res.render("userDocSection/patientfiles/myAppointments", {
          foundAppointments: foundAppointments,
        });
      }
    });
});

router.get("/userDocSection/myAppointments/show", function (req, res) { });

//book appointment button

router.post("/userDocSection/createAppointment/:docId", middleware.isLoggedIn, function (req, res) {
  var emergency = false;
  if (req.body.emergency != undefined) {
    emergency = true;
  }
  let newAppointment = {
    patientId: req.user._id,
    docId: req.params.docId,
    phone: req.body.phone,
    slot: req.body.preferSlot,
    disease: req.body.disease,
    selectedSlot: req.body.selectedSlot,
    isEmergency: emergency,
    age: req.body.age,
  };
  const dynamicSlotkey = "availableSlots." + req.body.selectedSlot;
  Doctor.findById(req.params.docId)
    .populate("handler_id")
    .exec(function (err, foundDoctor) {
      if (err) {
        console.log(err);
      } else {
        newAppointment.paidDoctorFees = foundDoctor.fees;
        User.findOne({ _id: ObjectId(req.user._id) }).exec(function (err, foundUserInfo) {
          if (err) {
            console.log(err)
          }
          else {
            console.log(foundUserInfo, "transaction wala page")
            res.render("user/Payment/transaction", {
              newAppointment: newAppointment,
              doctorData: foundDoctor,
              foundUserInfo: foundUserInfo
            });

          }
        })

      }
    });
});

//Appointment cancellation route
router.post(
  "/userDocSection/cancelAppointment/:appointId", middleware.isLoggedIn,
  function (req, res) {
    Appointment.findByIdAndUpdate(req.params.appointId, {
      $set: { activityStatus: false },
    }).exec(function (err, updatedAppointment) {
      if (err) {
        console.log(err);
      } else {
        User.findByIdAndUpdate(
          req.user._id,
          { $pull: { currentDoctors: updatedAppointment.docId } },
          function (error, updatedUser) {
            if (error) {
              console.log(error);
            } else {
              Appointment.find({
                _id: ObjectId(req.params.appointId),
                patientId: ObjectId(req.user._id),
                docId: ObjectId(updatedAppointment.docId),
              }).exec(function (err, foundAppointment) {
                if (err) {
                  console.log(err);
                } else {
                  const dynamicSlotKey =
                    "availableSlots." + foundAppointment[0].selectedSlot;
                  Doctor.findOneAndUpdate(
                    { _id: ObjectId(updatedAppointment.docId) },
                    { $inc: { [dynamicSlotKey]: 1 } }
                  ).exec(function (err, foundDoc) {
                    if (err) {
                      console.log(err);
                    } else {
                      DoctorStats.findOneAndUpdate(
                        { handlerId: ObjectId(foundDoc.handler_id) },
                        {
                          $inc: {
                            earnings: -foundAppointment[0].paidDoctorFees,
                          },
                        }
                      ).exec(function (err) {
                        if (err) {
                          console.log(err);
                        } else {
                          PatientStats.findOneAndUpdate(
                            { handlerId: ObjectId(req.user._id) },
                            {
                              $inc: {
                                expenditure:
                                  -foundAppointment[0].paidDoctorFees,
                              },
                            }
                          ).exec(function (err) {
                            if (err) {
                              console.log(err);
                            } else {
                              req.flash("success", "Appointment Canceled");
                              res.redirect("/userDocSection/myAppointments");
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          }
        );
      }
    });
  }
);

router.post("/generatePresc/addMedicine/:id", middleware.isLoggedIn, function (req, res) {
  const MedicineData = JSON.parse(req.body.hiddenMedicineName);
  const TestData = JSON.parse(req.body.hiddenTest);

  Doctor.find(
    { handler_id: ObjectId(req.user._id) },
    { _id: 1, fees: 1 },
    function (err, foundDoc) {
      if (err) {
        console.log(err);
        req.flash("error", "No Patient Found");
        res.redirect("/userDocSection/docDashboard");
      } else {
        Appointment.findOne({
          patientId: req.params.id,
          docId: foundDoc[0]._id,
          activityStatus: true,
        }).exec(function (error, foundAppointment) {
          if (error) {
            console.log(error);
          } else {
            const prescriptionData = {
              appointmentId: foundAppointment._id,
              date: Date.now(),
              disease: req.body.disease,
              medicines: MedicineData,
              test: TestData,
              comment: req.body.comment,
            };
            PatientHistory.updateOne(
              {
                handlerId: req.params.id,
                appointedDoctorId: foundDoc[0]._id,
              },
              { $push: { prescription: prescriptionData } }
            ).exec(function (err, medrecord) {
              if (err) {
                console.log(err);
              } else {
                DoctorStats.findOneAndUpdate({
                  $inc: {
                    newPatients: 1,
                    appointment: 1,
                  },
                })
                  .where("handlerId")
                  .equals(req.user._id)
                  .exec(function (error, updatedStats) {
                    if (error) {
                      console.log(error);
                    } else {
                      PatientStats.findOneAndUpdate({
                        $inc: { appointment: 1 },
                      })
                        .where("handlerId")
                        .equals(req.params.id)
                        .exec(function (err, updatedPatientStats) {
                          if (err) {
                            console.log(err);
                          } else {
                            Appointment.findOneAndUpdate(
                              {
                                patientId: req.params.id,
                                docId: foundDoc[0]._id,
                                activityStatus: true,
                              },
                              { $set: { isPrescriptionGenerated: true } },
                              function (error, updatedAppointment) {
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log(
                                    "Prescription Created!! Email the Prescription"
                                  );
                                  res.redirect(
                                    `/userDocSection/patientList/patientInfo/${req.params.id}`
                                  );
                                }
                              }
                            );
                          }
                        });
                    }
                  });
              }
            });
          }
        });
      }
    }
  );
});

router.post("/userDocSection/emailPrescription/:id", middleware.isLoggedIn, function (req, res) {
  sendPrescriptionMail.sendPrescriptionMail(
    req.body.email,
    req.body.filename,
    req.body.data,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully emailed prescription");
        res.redirect(
          `/userDocSection/patientList/patientInfo/${req.params.id}`
        );
      }
    }
  );
});

//-------------Complete Appointment Route----------
router.post(
  "/userDocSection/completeAppointment/:patientUserId", middleware.isLoggedIn,
  function (req, res) {
    Doctor.findOne(
      { handler_id: req.user._id },
      { _id: 1 },
      function (error, foundDoctor) {
        if (error) {
          console.log(err);
        } else {
          Appointment.findOneAndUpdate(
            {
              patientId: req.params.patientUserId,
              docId: foundDoctor.id,
              activityStatus: true,
            },
            { $set: { isCompleted: true, activityStatus: false, roomId: "" } },
            function (error, updatedAppointment) {
              if (error) {
                console.log(error);
              } else {
                User.findByIdAndUpdate(
                  req.params.patientUserId,
                  { $pull: { currentDoctors: foundDoctor._id } },
                  function (error, updatedUser) {
                    if (error) {
                      console.log(error);
                    } else {
                      Appointment.find(
                        {
                          _id: ObjectId(updatedAppointment._id),
                          patientId: ObjectId(req.params.patientUserId),
                          docId: ObjectId(foundDoctor._id),
                        },
                        { selectedSlot: 1 }
                      ).exec(function (err, selectedSlot) {
                        if (err) {
                          console.log(err);
                        } else {
                          req.flash("success", "Appointment Completed");
                          res.redirect("/userDocSection/patientList");
                        }
                      });
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

//universal routes
router.get("/userDocSection/appointments/:id", middleware.isLoggedIn, function (req, res) {
  res.render("userDocSection/appointments");
});

module.exports = router;
