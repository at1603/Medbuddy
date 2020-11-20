var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    path  = require("path"),
    methodOverride = require('method-override'),
    mongoose = require("mongoose"),
    flash = require('connect-flash')

var User = require('./models/userSchema')

mongoose.connect("mongodb://localhost:27017/medbuddy", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + '/public')));

var indexRoutes = require('./routes/indexRoutes.js')

app.use(indexRoutes);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(flash());

//Passport Configuration
app.use(require("express-session")({
    secret: "This is my secret",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    //res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.listen(3000, function(){
    console.log("server is connected!!");
});