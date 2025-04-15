const { getTargetThach } = require('../../services/configService');
const {
  appendProductThachServices,
  getAllProductThachServices,
  getfilterProductThachServices,
  getfilterProductNameThachServices,
  appendPresentThachServices,
  getPresentThachServices,
  getStyleThachServices,
  thachPostTargetServices,
  getTargetThachServices,
  thachGetTargetServices,
} = require('../../services/thach/index');

async function thachGetAllProductController(req, res) {
  try {
    const data = await getAllProductThachServices();

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

  console.log(sewingName, productName, date, timeLine, actualValue, productReceive, productAccept, productFails);
  if (!sewingName) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const timeStampValue = new Date().toLocaleString();
    const dayTarget = await getTargetThachServices(sewingName, date);

    const rows = await appendProductThachServices(sewingName, productName, date, timeLine, actualValue, productReceive, productAccept, productFails, dayTarget, timeStampValue);

    if (rows) {
      res.status(200).json({
        data: {},
        success: true,
        message: `Thêm sản phẩm ${sewingName} thành công lúc ${timeLine}`,
      });
    } else {
      res.status(404).json({ data: {}, success: true, message: `Thêm sản phẩm ${sewingName} thất bại lúc ${timeLine}` });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ data: {}, success: true, message: `Thêm sản phẩm ${sewingName} thất bại lúc ${timeLine}` });
  }
}

async function thachPostPresentController(req, res) {
  const { sewingName, date, present, absent } = req.body;

  if (!sewingName) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await appendPresentThachServices(sewingName, date, present, absent);

    if (rows) {
      res.status(200).json({
        data: {},
        success: true,
        message: `Thêm thành công số nhân viên chuyền ${sewingName} ngày ${date}`,
      });
    } else {
      res.status(404).json({ data: {}, success: true, message: `Thêm thất bại số nhân viên chuyền ${sewingName} ngày ${date}` });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ data: {}, success: false, message: `Thêm thất bại số nhân viên chuyền ${sewingName} ngày ${date}` });
  }
}

async function thachGetPresentController(req, res) {
  const { sewingName, date } = req.body;

  if (!sewingName) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await getPresentThachServices(sewingName, date);
    const data = rows.filter((els) => els[0] == sewingName && els[1] == date);
    if (rows) {
      res.status(200).json({
        data,
        success: true,
        message: 'Thêm thành công số lượng nhân viên theo chuy',
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

async function thachGetStyleController(req, res) {
  const { styleHat } = req.body;
  try {
    const data = await getStyleThachServices(styleHat);

    if (data) {
      res.status(200).json({
        data,
        success: true,
        message: 'Truy xuất thành công ảnh mũ mẫu',
      });
    } else {
      res.status(404).json({ error: 'Truy xuất không thành công ảnh mũ mẫu' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất ảnh mẫu.' });
  }
}

async function thachPostTargetController(req, res) {
  const { line, date, dayTarget } = req.body;

  try {
    const timeStampValue = new Date().toLocaleString();

    const data = await thachPostTargetServices(line, date, dayTarget, timeStampValue);

    if (data) {
      res.status(200).json({
        data,
        success: true,
        message: 'Truy xuất thành công ảnh mũ mẫu',
      });
    } else {
      res.status(404).json({ error: 'Truy xuất không thành công ảnh mũ mẫu' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất ảnh mẫu.' });
  }
}

async function thachGetTargetController(req, res) {
  try {
    const data = await thachGetTargetServices();

    if (data) {
      res.status(200).json({
        data,
        success: true,
        message: 'Truy xuất thành công ảnh mũ mẫu',
      });
    } else {
      res.status(404).json({ error: 'Truy xuất không thành công ảnh mũ mẫu' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất ảnh mẫu.' });
  }
}
module.exports = {
  thachGetPresentController,
  thachPostProductController,
  thachGetAllProductController,
  thachGetFilterProductController,
  getfilterProductNameThachController,
  thachPostPresentController,
  thachGetStyleController,
  thachPostTargetController,
  thachGetTargetController,
};
