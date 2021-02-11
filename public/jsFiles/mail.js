require("dotenv").config();
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = (text, cb) => {
  const mailOptions = {
    sender: "medbuddyHack2021@gmail.com",
    from: "MedBuddy",
    to: "harshpandey011@gmail.com",
    subject: "Appointment Started",
    html:
      '<p>This is your link to join the meeting <a href="' +
      text +
      '">' +
      text +
      "</a></p>",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

module.exports = sendMail;
