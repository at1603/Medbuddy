let express = require("express");
let router = express.Router();

var ObjectId = require("mongodb").ObjectID;
const Doctor = require("../models/docSchema");
const User = require("../models/userSchema");
const Appointment = require("../models/appointmentSchema");
const PatientHistory = require("../models/patientHistorySchema");
const DoctorStats = require("../models/statsSchema/doctorStatsSchema");
const PatientStats = require("../models/statsSchema/patientStatsSchema");

router.get("/user/transaction", middleware.isLoggedIn, function (req, res) {
  res.render("user/Payment/transaction");
});

router.post("/user/transaction/bookAppointment/:docId", function (req, res) {
  let newAppointment = JSON.parse(req.body.newAppointment);
  console.log(newAppointment)
  const dynamicSlotkey = "availableSlots." + newAppointment.selectedSlot;
  console.log(dynamicSlotkey)
  Doctor.find(
    { _id: ObjectId(req.params.docId) },
    { [dynamicSlotkey]: 1, handler_id: 1 }
  ).exec(function (err, checkAvailableSlots) {
    if (err) {
      console.log(err);
    } else {
      if (
        checkAvailableSlots[0]["availableSlots"][newAppointment.selectedSlot] ==
        0
      ) {
        console.log("This Slot is Already full");
        req.flash("error", "This Slot is Already full");
        res.redirect(`/userDocSection/docList/docInfo/${req.params.docId}`);
      } else {
        Appointment.create(newAppointment, function (err, createAppointment) {
          if (err) console.log(err);
          else {
            if (
              req.user.appointedDoctors &&
              req.user.appointedDoctors.includes(req.params.docId)
            ) {
              PatientHistory.findOne(
                {
                  handlerId: req.user._id,
                  appointedDoctorId: req.params.docId,
                },
                function (error, foundHistory) {
                  if (error) {
                    console.log(error);
                  } else {
                    User.findByIdAndUpdate(
                      req.user._id,
                      { $push: { currentDoctors: req.params.docId } },
                      function (er, updatedUser) {
                        if (er) {
                          console.log(er);
                        } else {
                          // if (newAppointment.selectedSlot == "slotA") {
                          Doctor.updateOne(
                            { _id: ObjectId(req.params.docId) },
                            { $inc: { [dynamicSlotkey]: -1 } },
                            { new: true }
                          ).exec(function (err, result) {
                            if (err) {
                              console.log(err);
                            } else {
                              PatientStats.findOneAndUpdate(
                                { handlerId: ObjectId(req.user._id) },
                                {
                                  $inc: {
                                    expenditure: req.body.totalExpenditure,
                                  },
                                }
                              ).exec(function (err) {
                                if (err) {
                                  console.log(err);
                                } else {
                                  DoctorStats.findOneAndUpdate(
                                    {
                                      handlerId: ObjectId(
                                        checkAvailableSlots[0].handler_id
                                      ),
                                    },
                                    {
                                      $inc: {
                                        earnings: newAppointment.paidDoctorFees,
                                      },
                                    }
                                  ).exec(function (err) {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                      res.redirect(
                                        "/userDocSection/patientDashboard"
                                      );
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
                }
              );
            } else {
              let defaultPatientHistory = {
                handlerId: req.user._id,
                appointedDoctorId: req.params.docId,
                prescription: [
                  {
                    date: Date.now(),
                  },
                ],
              };
              PatientHistory.create(
                defaultPatientHistory,
                function (error, defaultHistory) {
                  if (error) {
                    console.log(error);
                  } else {
                    User.findOneAndUpdate(
                      { _id: req.user._id },
                      {
                        $push: {
                          appointedDoctors: req.params.docId,
                          currentDoctors: req.params.docId,
                        },
                      },
                      function (err, updatedUser) {
                        if (err) {
                          console.log(err);
                        } else {
                          // if (newAppointment.selectedSlot == "slotA") {
                          Doctor.updateOne(
                            { _id: ObjectId(req.params.docId) },
                            { $inc: { [dynamicSlotkey]: -1 } },
                            { new: true }
                          ).exec(function (err, result) {
                            if (err) {
                              console.log(err);
                            } else {
                              PatientStats.findOneAndUpdate(
                                { handlerId: ObjectId(req.user._id) },
                                {
                                  $inc: {
                                    expenditure: req.body.totalExpenditure,
                                  },
                                }
                              ).exec(function (err) {
                                if (err) {
                                  console.log(err);
                                } else {
                                  DoctorStats.findOneAndUpdate(
                                    {
                                      handlerId: ObjectId(
                                        checkAvailableSlots[0].handler_id
                                      ),
                                    },
                                    {
                                      $inc: {
                                        earnings: newAppointment.paidDoctorFees,
                                      },
                                    }
                                  ).exec(function (err) {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                      res.redirect(
                                        "/userDocSection/patientDashboard"
                                      );
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
                }
              );
            }
          }
        });
      }
    }
  });
});
module.exports = router;
