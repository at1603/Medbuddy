var express = require("express"),
    router = express.Router(),
    passport = require('passport');

//Login get requests
router.get('/userLogin', function(req,res){
    // console.log(req.flash(error));
    res.render("auth/login"); 
 });

 //login post requests

router.post("/userLogin", passport.authenticate("local", 
{
    successRedirect: "/", 
    failureRedirect: "/userlogin",
    failureFlash : true,
    successFlash: 'Welcome! '
    }),function(req, res){

});


//logout 
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged Out Successfully! ");
    res.redirect("/");
 });

//Signup get requests
router.get('/register', function(req,res){
    res.render("auth/signup"); 
 });
 

module.exports = router;