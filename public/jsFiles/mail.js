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
const sendReceiptMail = (receiver, fileName, encodedString, cb) => {
  const mailOptions = {
    sender: "medbuddyHack2021@gmail.com",
    from: "MedBuddy",
    to: receiver,
    subject: "Appointment Receipt",
    html: "<p>This is your payment Receipt </p>",
    attachments: [
      {
        filename: fileName,
        content: new Buffer.from(encodedString, "base64"),
        encoding: "base64",
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
const sendPrescriptionMail = (receiver, fileName, encodedString, cb) => {
  const mailOptions = {
    sender: "medbuddyHack2021@gmail.com",
    from: "MedBuddy",
    to: receiver,
    subject: "Appointment Prescription",
    html: "<p>This is your prescription </p>",
    attachments: [
      {
        filename: fileName,
        content: new Buffer.from(encodedString, "base64"),
        encoding: "base64",
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
const sendContactUsMail = (message, cb) => {
  const mailOptions = {
    sender: "medbuddyHack2021@gmail.com",
    from: "MedBuddy",
    to: "ultimateraze011@gmail.com",
    subject: "Help Needed!",
    html: `<p>Name: ${message.name}</p><p>Email: ${message.email}</p><p>${message.message}</p>`,
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
  sendContactUsMail,
  sendReceiptMail
};
