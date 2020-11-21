var express = require("express");
var router = express.Router();

router.get('/section1/consultDoc', function(req,res){
    res.render('section1/index');
});

////+++////

//Doctor routes
router.get('/section1/patientinfo/:id', function(req, res){
    res.render('section1/docfiles/patientinfo');
});

router.get('/section1/reports/:id', function(req,res){
    res.render('section1/reports');
})

////+++////

//patient routes
router.get('/section1/docinfo/:id', function(req, res){
    res.render('section1/patientfiles/docinfo');
});

router.get('/section1/changeDoc/:id', function(req, res){
    res.render('section1/patientfiles/changeDoc');
});

router.get('/section1/searchDoc', function(req,res){
    res.render('section1/searchDoc')
});

router.get('/section1/prescrip/:id', function(req,res){
    res.render('section1/patientfiles/prescription');
});
////+++////

//universal routes
router.get('/section1/appointments/:id', function(req,res){
    res.render('section1/appointments');
})

module.exports = router;