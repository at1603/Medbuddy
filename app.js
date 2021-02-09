if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//All the npm packages
var express = require("express"),
  app = express(),
  server = require("http").Server(app),
  io = require("socket.io")(server),
  { v4: uuidV4 } = require("uuid"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  path = require("path"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  flash = require("connect-flash");

//All the models
var User = require("./models/userSchema"),
  Doctor = require("./models/docSchema");

mongoose.connect("mongodb://localhost:27017/medbuddy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/public")));

//All the routes

var indexRoutes = require("./routes/indexRoutes.js"),
  authRoutes = require("./routes/authRoutes"),
  dashBoardRoutes = require("./routes/dashBoardRoutes"),
  userDocRoutes = require("./routes/userDocRoutes"),
  userHospIndexRoutes = require("./routes/userHospRoutes/indexRoutes"),
  bloodBankRoutes = require("./routes/userHospRoutes/bloodBankRoutes"),
  organDonationRoutes = require("./routes/userHospRoutes/organDonationRoutes"),
  peekintoHospitalRoutes = require("./routes/userHospRoutes/peekIntoHospitalRoutes"),
  hospHospRoutes = require("./routes/hospHospRoutes"),
  miscRoutes = require("./routes/miscRoutes"),
  videoCallRoute = require("./videocall/videoRoutes"),
  seedDB = require("./seeds");


// seedDB();

//Passport Configuration
app.use(
  require("express-session")({
    secret: "This is my secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.locals.moment = require("moment");
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//Use external route files
app.use(indexRoutes);
app.use(authRoutes);

app.use(dashBoardRoutes);
app.use(userDocRoutes);
app.use(userHospIndexRoutes);
app.use(dashBoardRoutes);
app.use(bloodBankRoutes);
app.use(organDonationRoutes);
app.use(peekintoHospitalRoutes);
app.use(hospHospRoutes);

app.use(miscRoutes);
app.use(videoCallRoute);

//socket connection
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

//Listen on port 3000
server.listen(3000, function () {
  console.log("server is connected!!");
});
