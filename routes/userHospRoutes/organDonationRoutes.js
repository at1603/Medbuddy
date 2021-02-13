let express = require("express");
let router = express.Router();

const OrganRequest = require("../../models/hospModels/requestSchemas/organReqSchema");


// --------------Organ Search Routes--------------//
router.post("/userDocSection/index/searchOrgan/Liver", function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    if(state && city){
        OrganRequest.find({"organType": 'Liver', "state":state, "city": city, "isDonating": true}).exec(function(err,foundLivers){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundLivers: foundLivers, flag: 1});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Liver', "state":state, "isDonating": true}).exec(function(err,foundLivers){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundLivers: foundLivers, flag: 1});
            }
        });
    }
});
router.post("/userDocSection/index/searchOrgan/Kidney", function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    if(state && city){
        OrganRequest.find({"organType": 'Kidney', "state":state, "city": city, "isDonating": true}).exec(function(err,foundKidneys){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundKidneys: foundKidneys, flag: 1});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Kidney', "state":state, "isDonating": true}).exec(function(err,foundKidneys){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundKidneys: foundKidneys, flag: 1});
            }
        });
    }
});
router.post("/userDocSection/index/searchOrgan/Heart", function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    if(state && city){
        OrganRequest.find({"organType": 'Heart', "state":state, "city": city, "isDonating": true}).exec(function(err,foundHearts){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundHearts: foundHearts, flag: 1});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Heart', "state":state, "isDonating": true}).exec(function(err,foundHearts){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundHearts: foundHearts, flag: 1});
            }
        });
    }
});
router.post("/userDocSection/index/searchOrgan/Eyes", function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    if(state && city){
        OrganRequest.find({"organType": 'Eyes', "state":state, "city": city, "isDonating": true}).exec(function(err,foundEyes){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundEyes: foundEyes, flag: 1});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Eyes', "state":state, "isDonating": true}).exec(function(err,foundEyes){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundEyes: foundEyes, flag: 1});
            }
        });
    }
});
router.post("/userDocSection/index/searchOrgan/Intestine", function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    if(state && city){
        OrganRequest.find({"organType": 'Intestine', "state":state, "city": city, "isDonating": true}).exec(function(err,foundIntestines){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundIntestines: foundIntestines, flag: 1});
            }
        });
    } else if(state && !city){
        OrganRequest.find({"organType": 'Intestine', "state":state, "isDonating": true}).exec(function(err,foundIntestines){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/Organdonation/index", {foundIntestines: foundIntestines, flag: 1});
            }
        });
    }
});

// --------X----Organ Search Routes --------X-------//


// ---------Donation form Routes -------------------//

router.post("/userDocSection/organDonation/Liver", function(req, res){
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
        } else{
            res.redirect("/userHospSection/organDonation");
        }
    });

});
router.post("/userDocSection/organDonation/Kidney", function(req, res){
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
        } else{
            res.redirect("/userHospSection/organDonation");
        }
    });
});
router.post("/userDocSection/organDonation/Heart", function(req, res){
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
        } else{
            res.redirect("/userHospSection/organDonation");
        }
    });
});
router.post("/userDocSection/organDonation/Eyes", function(req, res){
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
        } else{
            res.redirect("/userHospSection/organDonation");
        }
    });
});
router.post("/userDocSection/organDonation/Intestine", function(req, res){
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
            console.log(err);
        } else{
            res.redirect("/userHospSection/organDonation");
        }
    });
});

// ---X-----Donation form Routes ---------X--------//

module.exports = router;