const { db } = require("../models/roomIdSchema");
const sendMail = require("../public/jsFiles/mail");
const sendSms = require("../public/jsFiles/sms");
var ObjectId = require("mongodb").ObjectID;
var express = require("express"),
  router = express.Router(),
  { v4: uuidV4 } = require("uuid"),
  indexRoute = require("../routes/indexRoutes"),
  room = require("../models/roomIdSchema");
const Appointment = require("../models/appointmentSchema");
const User = require("../models/userSchema");

router.post("/start_call", (req, res) => {
  // var roomId = uuidV4();
  var roomId = req.body.patientId;
  var newRoom = { roomId: roomId };
  room.create(newRoom, function (err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      const link = "http://localhost:3000/start_call" + roomId;
      sendMail.sendMail(link, req.body.email, function (err) {
        if (err) {
          console.log(err);
        } else {
          Appointment.findOneAndUpdate(
            {
              docId: ObjectId(req.body.docId),
              patientId: ObjectId(req.body.patientId),
              activityStatus: true,
            },
            { $set: { roomId: roomId } }
          ).exec(function (err) {
            if (err) {
              console.log(err);
            } else {
              const message =
                "Appointment Started! Pls check your email to join the room!";
              // sendSms(req.body.phone, message);
              res.status({ message: "Email sent!!!" });
              res.redirect(`/start_call${roomId}`);
            }
          });
        }
      });
    }
  });
});

router.get("/start_call:room", (req, res) => {
  User.findOne({ _id: ObjectId(req.user._id) }).exec(function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      res.render("../videocall/video", {
        roomId: req.params.room,
        foundUser: foundUser,
      });
    }
  });
});

router.get("/join_call", (req, res) => {
  room.find({}, function (err, allId) {
    if (err) {
      console.log(err);
    } else {
      console.log(allId);
      res.redirect("/start_call" + allId[0].roomId);
    }
  });
});

module.exports = router;
