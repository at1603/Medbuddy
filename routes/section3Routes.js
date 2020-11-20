var express = require("express");
var router = express.Router();

router.get('/consultDoc', function(req,res){
    res.render('section3/index');
});

module.exports = router;