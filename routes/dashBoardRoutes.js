let express = require('express');

var router = express.Router();

//----------Patient Routes--------------//
//----X-----Patient Routes-------X------//

//----------Doctor Routes--------------//
//----X-----Doctor Routes--------x-----//

//----------Hospital Admin Routes--------------//

router.get("/dashboards/hospAdmin/profileIndex", function(req, res){
    res.render("user/profilePages/profileIndex")
});

router.get("/dashboards/hospAdmin/hospitalProfile", function(req, res){
    res.render("user/profilePages/profileIndexPage/hospitalProfile")
});

router.get("/dashboards/hospAdmin/otheProfile", function(req, res){
    res.render("user/profilePages/profileIndexPage/otherProfile")
});

//-----X----Hospital Admin Routes-------X------//


module.exports = router;