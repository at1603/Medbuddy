const middlewareObj = {};
const User = require("../models/userSchema");

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    // req.flash("error", "Please Login First");
    res.redirect("/userLogin");
};


//Check whether user is hospital admin or not
middlewareObj.checkHospAdminOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role == "hospAdmin")
        {
            next();
        }else{
            req.flash("error", "Permission Denied! Wrong User.")
            res.redirect("back");
        } 
    }
}
//Check whether user is Doctor or not
middlewareObj.checkDoctorOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role == "doctor")
        {
            next();
        }else{
            req.flash("error", "Permission Denied! Wrong User.")
            res.redirect("back");
        } 
    }
}


module.exports = middlewareObj;