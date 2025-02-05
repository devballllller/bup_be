const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau 15 phút.' },
  statusCode: 429,
  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      error: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút.',
    });
  },
});

module.exports = limiter;
