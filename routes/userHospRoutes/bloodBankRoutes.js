let express = require("express");
const BloodBank = require("../../models/userHospModels/bloodBankSchema");
let router = express.Router();

router.post("/userHospSection/bloodBanks/search", function(req, res){
    const state = req.body.state;
    const city = req.body.city;

    console.log(state,"h",city);
    if(state && city){
        console.log("both");
        BloodBank.find({"address.state":state, "address.city": city}).exec(function(err,foundBloodBanks){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/BloodBanks/index", {foundBloodBanks: foundBloodBanks, flag:1})
            }
        });
    } else if(state && !city){
        BloodBank.find({"address.state":state}).exec(function(err,foundBloodBanks){
            if(err){
                console.log(err);
            } else{
                res.render("userHospSection/BloodBanks/index", {foundBloodBanks: foundBloodBanks, flag:1});
            }
        });
    }
});

// POST request for Donation Request.
router.post("/bloodBanks/requestDonation/:id", function(req,res){

});
module.exports = router;