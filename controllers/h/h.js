const { cloudfunctions } = require('googleapis/build/src/apis/cloudfunctions');
const { getAllAttendanceServices, getAllAttendanceServicesCheckField, insertAttendance, appendAttendance } = require('../../services/H/h');

//AUTH
async function authH(req, res) {
  try {
    const { name, password } = req.body;
    const rows = await getAllAttendanceServices();

    const data = rows?.filter((els) => els[1] == name && els[2] == password);

    if (data?.length > 0) {
      res.status(200).json({
        data,
        success: true,
        message: 'Đăng nhập thành công',
      });
    } else {
      res.status(404).json({ error: 'Không tìm thấy tên trong bảng tính.3' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
}

//ATTENDANCE
async function postAttendanceControllersH(req, res) {
  const { name, totalHour, typeHour } = req.body;

  try {
    const data = await getAllAttendanceServicesCheckField();

    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yy = today.getFullYear().toString().slice(-2);
    const hour = today.getDate();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    const formattedDate = `${dd}/${mm}/${yy}`;
    const formattedTime = `${hour}:${minutes}:${seconds}`;

    console.log(formattedDate, formattedTime);
    let rowIndex = data.findIndex((row) => row[1] == name);
    if (rowIndex == -1) {
      console.log(`Không thể tìm thấy tên ${name} trong cột`);
      return;
    }

    let columnIndex = data[0].indexOf(formattedDate);
    if (columnIndex == -1) {
      console.log(`Không thể tìm thấy trường ${name} trong hàng`);
      return;
    }

    let rangeTotalHour = `T${mm}!${String.fromCharCode(65 + columnIndex)}${rowIndex + 1}`;
    console.log(rangeTotalHour, 'rangeTotalHour');

    await insertAttendance([totalHour], rangeTotalHour);
    let rangeTypeHour = `T${mm}!${String.fromCharCode(65 + columnIndex)}${rowIndex + 2}`;
    await insertAttendance([typeHour], rangeTypeHour);
    const logValue = `Đã chấm công vào lúc ${totalHour} tổng giờ là ${typeHour}`;

    await appendAttendance([name, logValue, formattedDate, formattedTime]);

    if (data?.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Chấm công thành công',
      });
    } else {
      res.status(404).json({ error: 'Không tìm thấy tên trong bảng tính.4' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
}

async function getAllAttendanceControllersH(req, res) {
  try {
    const data = await getAllAttendanceServicesCheckField();
    return res.status(200).json({
      success: true,
      message: 'Get all attendance susscess!',
      data,
    });
  } catch (error) {}
}
module.exports = { postAttendanceControllersH, getAllAttendanceControllersH, authH };
