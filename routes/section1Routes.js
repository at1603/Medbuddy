var express = require("express");
var router = express.Router();

router.get('/consultDoc', function(req,res){
    res.render('section1/index');
});

module.exports = router;