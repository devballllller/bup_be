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

const getCurrentTime = () => {
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

module.exports = { generateCode, transporter, getCurrentTime };
