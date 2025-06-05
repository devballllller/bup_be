const fs = require('fs');

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
  getLoginThachServices,
  postManPSCSALARYServices,
  uploadServices,
  getFailureServices,
  postFailureNumberServices,
} = require('../../services/thach/index');
const ClientManager = require('../../config/websocket/clientManager');

// đăng nhập
async function getLoginThachController(req, res) {
  try {
    const data = await getLoginThachServices(req.body);

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

// lấy tất cả các sản phẩm
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
  const { sewingName, productName, date, timeLine, productReceive, productAccept, productFails, sewingNameMan } = req.body;

  if (!sewingName) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const timeStampValue = new Date().toLocaleString();
    const dayTarget = await getTargetThachServices(sewingName, date);
    const actualValue = Math.round(Number(dayTarget) / 8);

    const bodyData = { sewingName, productName, date, timeLine, productReceive, productAccept, productFails, dayTarget, timeStampValue, sewingNameMan, actualValue };

    const rows = await appendProductThachServices(bodyData);

    //call websocket
    const rowData = { sewingName, productName, dayTarget, date, timeLine, actualValue, productReceive, productAccept, productFails, timeStampValue, sewingNameMan };

    ClientManager.sendToClient(sewingName, {
      type: 'notification',
      rowData,
    });

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
    const bufferData = await getStyleThachServices(styleHat);

    if (bufferData) {
      const base64 = Buffer.from(bufferData.data).toString('base64');
      const mimeType = bufferData.mimeType || 'image/png';

      res.status(200).json({
        data: `data:${mimeType};base64,${base64}`,
        success: true,
        message: 'Truy xuất thành công ảnh mũ mẫu',
      });
    } else {
      res.status(404).json({ success: false, message: 'Không tìm thấy ảnh mũ mẫu' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi truy xuất ảnh mẫu.' });
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

async function thachtestController(req, res) {
  try {
    const data = await postManPSCSALARYServices();

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

async function uploadController(req, res) {
  try {
    const filePath = req.file.path;
    const result = await uploadServices(filePath);

    // Xoá file tạm sau khi upload thành công
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getFailureController(req, res) {
  try {
    const { sewingName, date } = req.body;

    const data = await getFailureServices(sewingName, date);

    res.json({ success: true, message: 'Truy xuất thành công ảnh dữ liệu lỗi', data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// chú ý
async function postFailureNumberController(req, res) {
  try {
    const data = await postFailureNumberServices(req.body);

    return res.json({ success: true, message: 'Truy xuất thành công ảnh dữ liệu lỗi', data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  getLoginThachController,
  thachGetPresentController,
  thachPostProductController,
  thachGetAllProductController,
  thachGetFilterProductController,
  getfilterProductNameThachController,
  thachPostPresentController,
  thachGetStyleController,
  thachPostTargetController,
  thachGetTargetController,
  thachtestController,
  uploadController,
  getFailureController,
  postFailureNumberController,
};
