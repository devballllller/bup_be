const { findEmployeeRestService, findEmployeeSalaryService } = require('../services/employee');

async function findEmployeeRestController(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await findEmployeeRestService(name);

    if (rows.length > 0) {
      const employee = rows[0];

      res.status(200).json({
        data: {
          EmployeeId: employee[0],
          EmployeeName: employee[1],
          jan: employee[16],
          feb: employee[17],
          mar: employee[18],
          apr: employee[19],
          may: employee[20],
          jun: employee[21],
          jul: employee[22],
          aug: employee[23],
          sep: employee[24],
          oct: employee[25],
          nov: employee[26],
          dec: employee[27],
          restUse: employee[28],
          restNotUse: employee[30],
        },
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

async function findEmployeeSalaryController(req, res) {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await findEmployeeSalaryService(phone);

    if (rows?.length > 0) {
      const employee = rows[0];

      res.status(200).json({
        data: {
          EmployeeId: employee[0],
          EmployeeName: employee[1],
          Position: employee[2],
          UrlSalary: employee[5],
        },
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

module.exports = { findEmployeeRestController, findEmployeeSalaryController };
