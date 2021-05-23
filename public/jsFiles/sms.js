require("dotenv").config();
const fast2sms = require("fast-two-sms");

const sendSms = (to, message) => {
  const options = {
    authorization: process.env.apiKey,
    message: message,
    numbers: [to],
  };
  console.log(options, "lets check this");
  fast2sms.sendMessage(options).then((response) => {
    console.log(response);
  });
};

module.exports = sendSms;
