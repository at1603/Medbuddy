const { db } = require("../models/roomIdSchema");
const sendMail = require("../public/jsFiles/mail");
const sendSms = require("../public/jsFiles/sms");

var express = require("express"),
  router = express.Router(),
  { v4: uuidV4 } = require("uuid"),
  indexRoute = require("../routes/indexRoutes"),
  room = require("../models/roomIdSchema");

router.post("/start_call", (req, res) => {
  var roomId = uuidV4();
  var newRoom = { roomId: roomId };
  console.log(
    req.body.filename,
    req.body.email,
    "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
  );
  room.create(newRoom, function (err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      const link = "http://localhost:3000/start_call" + roomId;
      sendMail.sendMail(link, req.body.email, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(req.body.phone);
          const message =
            "Appointment Started! Pls check your email to join the room!";
          sendSms(req.body.phone, message);
          res.status({ message: "Email sent!!!" });
          res.redirect(`/start_call${roomId}`);
        }
      });
    }
  });
});

router.get("/start_call:room", (req, res) => {
  res.render("../videocall/video", { roomId: req.params.room });
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
