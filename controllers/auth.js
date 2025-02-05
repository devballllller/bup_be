const { findValuesByNameAndPassword } = require('../services/auth');

async function loginController(req, res) {
  const { phone, password } = req.body;

  if ((!phone, !password)) {
    return res.status(400).json({ error: 'Số điện thoại hoặc mật khẩu không được phép rỗng.' });
  }

  try {
    const rows = await findValuesByNameAndPassword(phone, password);
    console.log(rows);

    if (rows.length > 0) {
      res.status(200).json({
        status: 2000,
        data: rows,
      });
    } else {
      res.status(404).json({ error: 'Không tìm thấy tên trong bảng tính.' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
}

async function testloginController(req, res) {
  res.status(200).json({ error: 'Không tìm thấy tên trong bảng tính.' });
}

module.exports = { loginController, testloginController };
