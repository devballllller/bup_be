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

async function insertTimekeepingServices(employeeId, dayTimekeeping, values) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getAllTimekeepingServices();

      let rowIndex = data.findIndex((row) => row[1] == employeeId);
      if (rowIndex === -1) {
        console.log(`Không tìm thấy tên ${employeeId} trong Google Sheets.`);
        return;
      }

      let columnIndex = data[0].indexOf(dayTimekeeping);

      if (columnIndex === -1) {
        console.log(`Không tìm thấy cột ${dayTimekeeping} trong Google Sheets.`);
        return;
      }
      let range = `Timekeeping!${String.fromCharCode(65 + columnIndex)}${rowIndex + 6}`;
      console.log('range', range);
      const response = await insertTimekeeping([values], range);
      if (!response) {
        reject('Chèn chấm công không thầnh công tại controller');
      }

      console.log(response);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { getAllTimekeepingServices, insertTimekeepingServices };
