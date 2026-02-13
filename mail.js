const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c22397804f696b",
    pass: "b3285b680c9611"
  }
});

module.exports = transporter;
