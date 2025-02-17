const twilio = require('twilio');

// Thông tin tài khoản Twilio của bạn
const accountSid = 'ACedef44b5f35942d086d2c53da7a17b89';
const authToken = '7adc06efa6a87d870ee5861aba51c034';
const client = new twilio(accountSid, authToken);

// Thực hiện cuộc gọi
client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml', // URL xử lý cuộc gọi
    to: '+84708034532', // Số điện thoại người nhận
    from: '+15152093340', // Số điện thoại Twilio của bạn
  })
  .then((call) => console.log(call.sid)) // In ra SID cuộc gọi để xác nhận thành công
  .catch((err) => console.error('Error: ', err)); // Xử lý lỗi nếu có
