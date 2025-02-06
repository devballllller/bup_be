require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Cấu hình SMTP của Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API gửi email
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Thiếu thông tin gửi email' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    res.status(200).json({ message: 'Email gửi thành công!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi gửi email', error });
  }
});

// Chạy server
app.listen(3003, () => console.log('Server chạy trên cổng 3000'));
