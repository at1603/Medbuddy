let express = require("express");
const BloodBank = require("../../models/userHospModels/bloodBankSchema");
let router = express.Router();

router.post("/bloodBanks/search", function(req, res){
    let state = req.body.state,
        city = req.body.city;

    console.log(state, city);
    BloodBank.find({'address.state': state}).where('address.city').equals(city).exec(function(err, foundBloodBanks){
            if(err){
                console.log(err);
            }
            else {
                res.render("userHospSection/BloodBanks/index", {BloodBanks: foundBloodBanks, flag:1})
            }
    });
});

// POST request for Donation Request.
router.post("/bloodBanks/requestDonation/:id", function(req,res){

});
module.exports = router;