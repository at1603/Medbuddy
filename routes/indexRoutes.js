var express = require("express");
var router = express.Router();


var sendMail = require("../public/jsFiles/mail");

//Dashboard routes
router.get("/user/doctor/dashboard", function(req, res) {
    res.render("user/dashboards/docDashboard")
});

router.get("/user/patient/dashboard", function(req, res) {
    res.render("user/dashboards/patientDashboard")
});
//Manage hospital routes

router.get("/hospHospSection/initialPage", function(req, res) {
    res.render("hospHospSection/index");
});

//home page route
router.get("/", function(req, res) {
    res.render("landing");
});

//about page route
router.get("/about", function(req, res) {
    res.render("about");
});

//contact page route
router.get("/contact", function(req, res) {
    res.render("contact");
});

router.post("/email", (req, res) => {
    const Data = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        text: req.body.text,
    };

    sendMail(
        Data.name,
        Data.email,
        Data.subject,
        Data.text,
        function(err, data) {
            if (err) {
                res.status(500).json({ message: "Internal Error" });
            } else {
                res.redirect("/contact_us");
                res.status({ message: "Email sent!!!" });
            }
        }
    );
});

router.get("/timeline", function(req, res) {
    res.render("timeline");
});


module.exports = router;