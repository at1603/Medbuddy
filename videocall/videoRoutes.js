const { db } = require("../models/roomIdSchema");
const sendMail = require("../public/jsFiles/mail");

var express = require("express"),
  router = express.Router(),
  { v4: uuidV4 } = require("uuid"),
  indexRoute = require("../routes/indexRoutes"),
  room = require("../models/roomIdSchema");

router.post("/start_call", (req, res) => {
  var roomId = uuidV4();
  var newRoom = { roomId: roomId };
  room.create(newRoom, function (err, newCreated) {
    if (err) {
      console.log(err);
    } else {
      const link = "http://localhost:3000/start_call" + roomId;
      sendMail(link, function (err, data) {
        if (err) {
          res.status(500).json({ message: "Internal Error" });
        } else {
          res.redirect("/userDocSection/patientInfo");
          res.status({ message: "Email sent!!!" });
        }
      });
      res.redirect(`/start_call${roomId}`);
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
