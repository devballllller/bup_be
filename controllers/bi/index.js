const { biPostEmployeeService } = require('../../services/bi/index');

async function biPostEmployeeController(req, res) {
  const { name, gender, dob, phone, permanentaddress, currentaddress, cmnd, cccd, issueddate, SIC, SIB, PITC } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await biPostEmployeeService(name, gender, dob, phone, permanentaddress, currentaddress, cmnd, cccd, issueddate, SIC, SIB, PITC);

    if (rows) {
      res.status(200).json({
        data: {},
        success: true,
        message: 'Truy xuất thành công thông tin ngày phép nhân viên',
      });
    } else {
      res.status(404).json({ error: 'Không tìm thấy tên trong bảng tính22.' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
}

module.exports = { biPostEmployeeController };
