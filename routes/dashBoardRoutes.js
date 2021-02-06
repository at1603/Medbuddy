let express = require('express');
const HospitalAdmin = require('../models/hospAdminSchema');
Hospital = require("../models/hospSchema")

var router = express.Router();

//----------Patient Routes--------------//
//----X-----Patient Routes-------X------//

//----------Doctor Routes--------------//
//----X-----Doctor Routes--------x-----//

//----------Hospital Admin Routes--------------//
router.get("/user/hospAdmin/dashboard", function(req, res) {
    Hospital.find().where('handler.id').equals(req.user._id).exec(function(err, foundHosp){
        if(err){
            console.log(err);
        }else{
            if(foundHosp)
                res.render("user/dashboards/hospAdminDashboard", {foundHosp: foundHosp});
        }
    })
});


router.get("/dashboards/hospAdmin/profileIndex", function(req, res){
    res.render("user/profilePages/profileIndex")
});

router.get("/dashboards/hospAdmin/hospitalProfile", function(req, res){
    res.render("user/profilePages/profileIndexPage/hospitalProfile")
});

router.get("/dashboards/hospAdmin/hospAdminProfile", function(req, res){
    res.render("user/profilePages/profileIndexPage/hospAdminProfile")
});

router.get("/dashboards/hospAdmin/otheProfile", function(req, res){
    res.render("user/profilePages/profileIndexPage/otherProfile")
});

////```````````Hospital Info post request`````````````///////

router.post("/dashboards/hospAdmin/hospitalProfile", function(req, res){
    let newHosp = {
        name: req.body.hospName,
        type: req.body.type,
        speciality: req.body.speciality,
        contact: {
            email: req.body.email,
            phone: req.body.phone
        },
        handler: {
            id: req.user._id,
            username: req.user.username
        },
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        },
        about: req.body.aboutHosp
    };

    Hospital.create(newHosp, function(err, newHospital){
        if(err){
            console.log(err);
        } else{
            res.redirect('/dashboards/hospAdmin/profileIndex');
        }
    });
});

////``````````````Hospital Admin Post request```````````````/////

router.post("/dashboards/hospAdmin/hospAdminProfile", function(req, res){
    let newHospAdm = {
        oxyCur: req.body.oxyCur,
        ambCur: req.body.ambCur,
        numBeds: req.body.numBeds,
        partOf: req.body.hospId,
        handler:{
            id: req.user._id,
            username:req.user.username
        },
        adminContact: {
            email: req.body.email,
            phone: req.body.phone
        }
    };

    Hospital.findById(req.body.hospId, function(error, foundHosp){
        if(error){
            console.log(error);
        } else{
            HospitalAdmin.create(newHospAdm, function(err, newAdmin){
                if(err){
                    console.log(err);
                }else{
                    foundHosp.hasAdmin = true;
                    res.redirect('/dashboards/hospAdmin/profileIndex');
                }
            });
        }
    });
});


//-----X----Hospital Admin Routes-------X------//


module.exports = router;