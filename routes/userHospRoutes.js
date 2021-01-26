var express = require("express");
var router = express.Router();

router.get('/manageHosp', function(req,res){
    res.render('section2/index');
});

router.get('/prescription', function(req,res){
    res.render('section2/index', {str: 'prescription'});
});


module.exports = router;