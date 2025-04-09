const { allTimekeeping, insertTimekeeping } = require('./configService');

async function getAllTimekeepingServices() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await allTimekeeping();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

const getExcelColumnName = (colIndex) => {
  let columnName = '';
  while (colIndex >= 0) {
    columnName = String.fromCharCode((colIndex % 26) + 65) + columnName;
    colIndex = Math.floor(colIndex / 26) - 1;
  }
  return columnName;
};

async function insertTimekeepingServices(employeeId, dayTimekeeping, values) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getAllTimekeepingServices();

      let rowIndex = data.findIndex((row) => row[1] == employeeId);
      if (rowIndex === -1) {
        console.log(`Không tìm thấy nhân viên ${employeeId} trong Google Sheets.`);
        reject(`Không tìm thấy nhân viên ${employeeId}`);
        return;
      }

      let columnIndex = data[0].indexOf(dayTimekeeping);
      if (columnIndex === -1) {
        console.log(`Không tìm thấy cột ${dayTimekeeping} trong Google Sheets.`);
        reject(`Không tìm thấy cột ${dayTimekeeping}`);
        return;
      }

      // Sử dụng hàm để chuyển đổi index thành ký hiệu cột
      let columnLetter = getExcelColumnName(columnIndex);
      let range = `Timekeeping!${columnLetter}${rowIndex + 6}`;

      const response = await insertTimekeeping([values], range);
      if (!response) {
        reject('Chèn chấm công không thành công tại controller');
        return;
      }

      resolve(response);
    } catch (error) {
      console.error('Lỗi trong insertTimekeepingServices:', error);
      reject(error);
    }
  });
}

module.exports = { getAllTimekeepingServices, insertTimekeepingServices };
