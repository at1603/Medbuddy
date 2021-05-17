require("dotenv").config();
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = (text, receiver, cb) => {
  const mailOptions = {
    sender: "medbuddyHack2021@gmail.com",
    from: "MedBuddy",
    to: receiver,
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

const sendPrescriptionMail = (receiver, fileName, cb) => {
  var file = "C:/Users/MasterChief/Downloads/" + fileName;
  const mailOptions = {
    sender: "medbuddyHack2021@gmail.com",
    from: "MedBuddy",
    to: receiver,
    subject: "Appointment Prescription",
    html: "<p>This is your prescription </p>",
    attachments: [
      {
        filename: fileName,
        path: file,
        contentType: "application/pdf",
      },
    ],
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};
module.exports = {
  sendMail,
  sendPrescriptionMail,
};
