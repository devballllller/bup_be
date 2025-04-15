const {
  biPostEmployeeService,
  biloginRequestSercvices,
  biGetAllVPPSercvices,
  biPostRequestVPPSercvices,
  biGetRequestVPPUserSercvices,
  biAcceptAdminSercvices,
  biGetAllRequestVPPSercvices,
  biGetAllUserSercvices,
  biGetAllDevicesSercvices,
  biGetAllUniformSercvices,
} = require('../../services/bi/index');

// form huyền
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
// form huyền
async function biloginRequestController(req, res) {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await biloginRequestSercvices(phone);

    if (rows) {
      res.status(200).json({
        data: rows,
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

// --------------------------------------------bi
// lấy trạng thái sim ở sheet SIM
async function bilSimInfoController(req, res) {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await biloginRequestSercvices(phone);

    if (rows) {
      res.status(200).json({
        data: rows,
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

// lấy tất cả vpp  ở sheet Stationary
async function biGetAllVPPController(req, res) {
  try {
    const { data, data1, data2 } = await biGetAllVPPSercvices();

    if (data) {
      res.status(200).json({
        data: {
          data,
          data1,
          data2,
        },
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
// lấy tất cả đồng phục  ở sheet uniform
async function biGetAllUniformController(req, res) {
  try {
    const { data, data1, data2 } = await biGetAllUniformSercvices();

    if (data) {
      res.status(200).json({
        data: {
          data,
          data1,
          data2,
        },
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

// lấy tất cả thiết bị ở sheet devices
async function biGetAllDevicesController(req, res) {
  try {
    const { data, data1, data2 } = await biGetAllDevicesSercvices();

    if (data) {
      res.status(200).json({
        data: {
          data,
          data1,
          data2,
        },
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

// lấy tất cả yêu cầu vpp
async function biGetAllRequestVPPController(req, res) {
  try {
    const data = await biGetAllRequestVPPSercvices();

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
// gửi yêu cầu vpp  ở sheet Stationary
async function biPostRequestVPPController(req, res) {
  const { name, phone, vppname, vppnumber, daysend, type } = req.body;

  const randomString = Math.random().toString(36).substring(2, 8);
  const uuid = `${daysend}-${phone}-${randomString}`;

  try {
    const data = await biPostRequestVPPSercvices(uuid, name, phone, vppname, vppnumber, daysend, type);

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
// lấy các yêu cầu vpp  ở sheet Stationary
async function biGetRequestVPPUserController(req, res) {
  const { phone, type } = req.body;
  try {
    const data = await biGetRequestVPPUserSercvices(phone, type);

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
// lấy các yêu cầu vpp  ở sheet Stationary
async function biAcceptAdminController(req, res) {
  const { id, status, reason, name, number } = req.body;
  try {
    console.log(id, status, reason, name, number);
    const data = await biAcceptAdminSercvices(id, status, reason, name, number);

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
// lấy các người dùng
async function biGetAllUserControllers(req, res) {
  try {
    const data = await biGetAllUserSercvices();

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

module.exports = {
  biPostEmployeeController,
  biloginRequestController,
  bilSimInfoController,
  biGetAllVPPController,
  biPostRequestVPPController,
  biGetRequestVPPUserController,
  biAcceptAdminController,
  biGetAllRequestVPPController,
  biGetAllUserControllers,
  biGetAllUniformController,
  biGetAllDevicesController,
};
