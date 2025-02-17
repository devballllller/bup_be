const { getAllTimekeepingServices, insertTimekeepingServices } = require('../services/timekeeping');

async function getAllTimekeepingControllers(req, res) {
  try {
    const data = await getAllTimekeepingServices();

    if (!data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bảng tính.', data: [] });
    }

    return res.status(200).json({
      success: true,
      message: 'Truy truy xuất thành công tất cả dữ liệu trong bảng chấm congo',
      data,
    });
  } catch (error) {
    console.log(error);
  }
}

async function insertTimekeepingControllers(req, res) {
  const { employeeId, dayTimekeeping, values } = req.body;

  try {
    const data = await insertTimekeepingServices(employeeId, dayTimekeeping, values);

    if (!data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bảng tính.', data: [] });
    }
    return res.status(200).json({ success: true, message: 'Chèn chấm công thành công.', data });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllTimekeepingControllers, insertTimekeepingControllers };
