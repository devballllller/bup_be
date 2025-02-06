require('dotenv').config();

const nodemailer = require('nodemailer');

function generateCode() {
  return Math.random().toString(36).substring(2, 16).toUpperCase();
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = { generateCode, transporter };
