const { transporter } = require('../constants/index');
require('dotenv').config();

async function getSendEmailController({ to, subject, text }) {
  if (!to || !subject || !text) {
    console.error('Thiếu thông tin gửi email');
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error('Lỗi gửi email:', error);
  }
}

module.exports = { getSendEmailController };
