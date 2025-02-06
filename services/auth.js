const { findEmployeeSalaryService } = require('./employee');

async function findValuesByNameAndPassword(phone, password) {
  const data = await findEmployeeSalaryService(phone, password);

  return data;
}

// Tìm dữ liệu theo tên trong bảng Salary
async function findEmployeeSalary(phone, password) {
  const data = await getSheetData('SALARY');
  const filteredData = data.filter((row) => row[2] == phone && row[4] == password);

  return filteredData[0];
}

module.exports = { findValuesByNameAndPassword };
