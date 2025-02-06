const { allUserRest, allUserSalary } = require('./configService');

// Tìm dữ liệu theo tên trong bảng Rest
async function findEmployeeRestService(name) {
  const allEmployee = await allUserRest();
  const data = allEmployee.filter((nameRow) => nameRow[1]?.toLowerCase() === name.toLowerCase());
  return data;
}

// Tìm dữ liệu theo tên trong bảng Salary
async function findEmployeeSalaryService(phone) {
  const allEmployee = await allUserSalary();
  const data = allEmployee.filter((row) => row[2] == phone);
  return data;
}

module.exports = { findEmployeeRestService, findEmployeeSalaryService };
