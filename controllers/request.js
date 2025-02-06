const { getSendAllRequestService, getSendRequestService, PostSendRequestService } = require('../services/request');
const { getSendEmailController } = require('./email');

async function getSendAllRequestController(req, res) {
  const { name, employeeId } = req.body;

  console.log(name, employeeId);
  if (!name || !employeeId) {
    return res.status(400).json({ error: 'Tên không được phép rỗng. hoặc không tồn tại nhân viên' });
  }

  try {
    const rows = await getSendAllRequestService(name, employeeId);
    console.log(rows);
    if (rows?.length > 0) {
      res.status(200).json({
        data: {},
        status: 200,
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

  console.log(employeeId);
  if (!employeeId) {
    return res.status(400).json({ error: 'Tên không được phép rỗng. hoặc không tồn tại nhân viên' });
  }

  try {
    const rows = await getSendRequestService(employeeId);
    console.log(rows, '12');

    res.status(200).json({
      data: { mes: 'ok' },
      status: 200,
    });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
}

async function postSendRequestController(req, res) {
  const { name, employeeId } = req.body;

  console.log(name, employeeId);
  if (!name || !employeeId) {
    return res.status(400).json({ error: 'Tên không được phép rỗng hoặc không tồn tại nhân viên' });
  }

  try {
    const rows = await PostSendRequestService(name, employeeId);

    if (rows.status == 201) {
      await getSendEmailController({
        to: process.env.EMAIL_USER_RECIEVE,
        subject: 'Test Email',
        text: `Nhân viên ${name} (${employeeId}) vừa gửi yêu cầu.`,
      });
    }

    return res.status(200).json(rows);
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
}

module.exports = { getSendAllRequestController, getSendRequestController, postSendRequestController };
