const express = require("express");
const router = express.Router();
const middleware = require("../../middlewares/authMiddlewares");
const OrganRequest = require("../../models/hospModels/requestSchemas/organReqSchema");


// -----------Organ Petitioner search routes ---------------//
router.post("/userDocSection/index/searchPetitioners", middleware.isLoggedIn, function(req, res){
    OrganRequest.find({"isDonating": false}).exec(function(err, foundPetitioners){
        if(err){
            console.log(err);
        }else{
            res.render("userHospSection/Organdonation/index", {foundPetitioners: foundPetitioners, flag: 2});
        }
    });
});

// --------------Organ Search Routes--------------//
router.post("/userDocSection/index/searchOrgan/Liver",middleware.isLoggedIn, function(req, res){
    const state = req.body.state;
    const city = req.body.city;
    console.log(state, city);

    if(state && city){
        OrganRequest.find({"organType": 'Liver', "address.state":state, "address.city": city, "isDonating": true}).exec(function(err,foundLivers){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundLivers: foundLivers, flag: 1, organ: 1});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Liver', "address.state":state, "isDonating": true}).exec(function(err,foundLivers){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundLivers: foundLivers, flag: 1, organ: 1});
            }
        });
    }
});
router.post("/userDocSection/index/searchOrgan/Kidney",middleware.isLoggedIn, function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    if(state && city){
        OrganRequest.find({"organType": 'Kidney', "address.state":state, "address.city": city, "isDonating": true}).exec(function(err,foundKidneys){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundKidneys: foundKidneys, flag: 1, organ: 2});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Kidney', "address.state":state, "isDonating": true}).exec(function(err,foundKidneys){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundKidneys: foundKidneys, flag: 1, organ: 2});
            }
        });
    }
});
router.post("/userDocSection/index/searchOrgan/Heart",middleware.isLoggedIn, function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    if(state && city){
        OrganRequest.find({"organType": 'Heart', "address.state":state, "address.city": city, "isDonating": true}).exec(function(err,foundHearts){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundHearts: foundHearts, flag: 1, organ: 3});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Heart', "address.state":state, "isDonating": true}).exec(function(err,foundHearts){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundHearts: foundHearts, flag: 1, organ: 3});
            }
        });
    }
});
router.post("/userDocSection/index/searchOrgan/Eyes",middleware.isLoggedIn, function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    if(state && city){
        OrganRequest.find({"organType": 'Eyes', "address.state":state, "address.city": city, "isDonating": true}).exec(function(err,foundEyes){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundEyes: foundEyes, flag: 1, organ: 4});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Eyes', "address.state":state, "isDonating": true}).exec(function(err,foundEyes){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundEyes: foundEyes, flag: 1, organ: 4});
            }
        });
    }
});
router.post("/userDocSection/index/searchOrgan/Intestine",middleware.isLoggedIn, function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    if(state && city){
        OrganRequest.find({"organType": 'Intestine', "address.state":state, "address.city": city, "isDonating": true}).exec(function(err,foundIntestines){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundIntestines: foundIntestines, flag: 1, organ: 5});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Intestine', "address.state":state, "isDonating": true}).exec(function(err,foundIntestines){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundIntestines: foundIntestines, flag: 1, organ: 5});
            }
        });
    }
});

// --------X----Organ Search Routes --------X-------//


// ---------Donation form Routes -------------------//

    
router.post("/userDocSection/organDonation/Liver",middleware.isLoggedIn, function(req, res){
    newLiver = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        address: {
            street: req.user.address.street,
            city: req.user.address.city,
            state: req.user.address.state,
            zip: req.user.address.zip,
        },
        email: req.user.email,
        bloodGroup: req.body.bloodgroup,
        disease: req.body.disease,
        age: req.body.age,
        organType: "Liver"
    };
    if(req.body.radioLiver == "donating"){
        newLiver.isDonating = true;
    }
    OrganRequest.create(newLiver, function(err, newLiverReq){
        if(err){
            console.log(err);
            req.flash("error", "Something bad occurred!")
        } else{
            req.flash("success", "Form Submitted Successfully!");
            res.redirect("/userHospSection/organDonation");
        }
    });

});
router.post("/userDocSection/organDonation/Kidney",middleware.isLoggedIn, function(req, res){
    newKidney = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        address: {
            street: req.user.address.street,
            city: req.user.address.city,
            state: req.user.address.state,
            zip: req.user.address.zip,
        },
        email: req.user.email,
        bloodGroup: req.body.bloodgroup,
        disease: req.body.disease,
        age: req.body.age,
        organType: "Kidney",
    };
    if(req.body.radioKidney == "donating"){
        newKidney.isDonating = true;
    }

    OrganRequest.create(newKidney, function(err, newKidneyReq){
        if(err){
            console.log(err);
            req.flash("error", "Something bad occurred!")
        } else{
            req.flash("success", "Form Submitted Successfully!");
            res.redirect("/userHospSection/organDonation");
        }
    });
});
router.post("/userDocSection/organDonation/Heart",middleware.isLoggedIn, function(req, res){
    newHeart = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        address: {
            street: req.user.address.street,
            city: req.user.address.city,
            state: req.user.address.state,
            zip: req.user.address.zip,
        },
        email: req.user.email,
        bloodGroup: req.body.bloodgroup,
        disease: req.body.disease,
        age: req.body.age,
        organType: "Heart",
    };
    if(req.body.radioHeart == "donating"){
        newHeart.isDonating = true;
    }

    OrganRequest.create(newHeart, function(err, newHeartReq){
        if(err){
            console.log(err);
            req.flash("error", "Something bad occurred!")
        } else{
            req.flash("success", "Form Submitted Successfully!");
            res.redirect("/userHospSection/organDonation");
        }
    });
});
router.post("/userDocSection/organDonation/Eyes",middleware.isLoggedIn, function(req, res){
    newEyes = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        address: {
            street: req.user.address.street,
            city: req.user.address.city,
            state: req.user.address.state,
            zip: req.user.address.zip,
        },
        email: req.user.email,
        bloodGroup: req.body.bloodgroup,
        disease: req.body.disease,
        age: req.body.age,
        organType: "Eyes",
    };
    if(req.body.radioEyes == "donating"){
        newEyes.isDonating = true;
    }

    OrganRequest.create(neEyes, function(err, nwEyesReq){
        if(err){
            console.log(err);
            req.flash("error", "Something bad occurred!")
        } else{
            req.flash("success", "Form Submitted Successfully!");
            res.redirect("/userHospSection/organDonation");
        }
    });
});
router.post("/userDocSection/organDonation/Intestine",middleware.isLoggedIn, function(req, res){
    newIntestine = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        address: {
            street: req.user.address.street,
            city: req.user.address.city,
            state: req.user.address.state,
            zip: req.user.address.zip,
        },
        email: req.user.email,
        bloodGroup: req.body.bloodgroup,
        disease: req.body.disease,
        age: req.body.age,
        organType: "Intestine",
    };
    if(req.body.radioIntestine == "donating"){
        newIntestine.isDonating = true;
    }

    OrganRequest.create(neIntestine, function(err, nwIntestineReq){
        if(err){
            req.flash("error", "Something bad occurred!")
            console.log(err);
        } else{
            req.flash("success", "Form Submitted Successfully!");
            res.redirect("/userHospSection/organDonation");
        }
    });
});

// ---X-----Donation form Routes ---------X--------//

module.exports = router;