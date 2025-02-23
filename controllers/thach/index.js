const { appendProductThachServices, getAllProductThachServices, getfilterProductThachServices, getfilterProductNameThachServices } = require('../../services/thach/index');

async function thachGetAllProductController(req, res) {
  try {
    const data = await getAllProductThachServices();
    console.log(data);
    if (data) {
      res.status(200).json({
        data,
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

async function thachPostProductController(req, res) {
  const { sewingName, productName, date, timeLine, actualValue, productReceive, productAccept, productFails } = req.body;

  if (!sewingName) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await appendProductThachServices(sewingName, productName, date, timeLine, actualValue, productReceive, productAccept, productFails);

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

// lấy filter các product name
async function getfilterProductNameThachController(req, res) {
  const { sewingName } = req.body;
  try {
    const data = await getfilterProductNameThachServices(sewingName);

    if (data) {
      res.status(200).json({
        data,
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

async function thachGetFilterProductController(req, res) {
  const { sewingName, date } = req.body;
  try {
    const data = await getfilterProductThachServices(sewingName, date);
    if (data) {
      res.status(200).json({
        data,
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

module.exports = { thachPostProductController, thachGetAllProductController, thachGetFilterProductController, getfilterProductNameThachController };
