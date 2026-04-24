const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Tera Gmail (e.g., upen@gmail.com)
    pass: process.env.EMAIL_PASS, // Tera Gmail App Password (16 digit code)
  },
});