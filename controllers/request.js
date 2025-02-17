const { getSendAllRequestService, getSendRequestService, PostSendRequestService, InsertServices } = require('../services/request');
const { getSendEmailController } = require('./email');

async function getSendAllRequestController(req, res) {
  try {
    const rows = await getSendAllRequestService();

    // const data = rows?.filter((els) => els[6] == 'FALSE');
    // const data = rows?.filter((els) => els[5] == 'FALSE');
    const data = rows;
    if (data?.length > 0) {
      res.status(200).json({
        data,
        success: true,
        message: 'Truy xuất thành công tất cả nhân viên',
      });
    } else {
      res.status(404).json({ error: 'Không tìm thấy tên trong bảng tính.' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
}

async function getSendRequestController(req, res) {
  const { employeeId } = req.body;

  if (!employeeId) {
    return res.status(400).json({ error: 'Tên không được phép rỗng. hoặc không tồn tại nhân viên' });
  }

  try {
    const data = await getSendRequestService(employeeId);

    res.status(200).json({
      data,
      success: true,
      message: 'Truy xuất các yêu cầu thành công',
    });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
}

async function postSendRequestController(req, res) {
  const { name, employeeId, TypeRequest, DateTimekeeping, Request, Image } = req.body;

  console.log(name, employeeId);
  if (!name || !employeeId) {
    return res.status(400).json({ error: 'Tên không được phép rỗng hoặc không tồn tại nhân viên' });
  }

  try {
    const rows = await PostSendRequestService(name, employeeId, TypeRequest, Request, Image, DateTimekeeping);

    if (rows.status == 201) {
      await getSendEmailController({
        to: process.env.EMAIL_USER_RECIEVE,
        subject: 'Test Email',
        text: `Nhân viên ${name} (${employeeId}) vừa gửi yêu cầu.`,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Gửi yêu cầu thành công',
      data: [],
    });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
}

async function insertAcceptController(req, res) {
  const { employeeId, value, field } = req.body;
  console.log(employeeId, value, field);
  try {
    const data = await InsertServices(employeeId, value, field);

    return res.status(200).json({
      success: true,
      message: 'Gửi yêu cầu thành công',
      data,
    });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu. hàm testInsert' });
  }
}

module.exports = { getSendAllRequestController, getSendRequestController, postSendRequestController, insertAcceptController };
