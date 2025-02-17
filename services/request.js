const { allRequest, sendRequest, insertAccpetRequest, allSendRequest } = require('./configService');
const { generateCode, getCurrentTime } = require('../constants');
const { cloudfunctions } = require('googleapis/build/src/apis/cloudfunctions');

// Tìm dữ liệu theo tên trong bảng Salary
async function getSendAllRequestService() {
  const allEmployee = await allRequest();
  return allEmployee;
}

async function getSendRequestService(employeeId) {
  const allEmployee = await allRequest();
  console.log(allEmployee);
  const data = allEmployee?.filter((empId) => empId[0] == employeeId);
  return data;
}

async function PostSendRequestService(name, employeeId, TypeRequest, Request, Image, DateTimekeeping) {
  return new Promise(async (resolve, reject) => {
    try {
      const timestamp = getCurrentTime();
      const user = [employeeId, TypeRequest, name, Request, Image, DateTimekeeping, 'FALSE', timestamp];

      await sendRequest(user);

      resolve({
        status: 201,
        mes: 'tạo thành công yêu cầu',
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function InsertServices(employeeId, values, field) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await allSendRequest();
      let rowIndex = data.findIndex((row) => row[0] == employeeId);

      if (rowIndex === -1) {
        console.log(`Không tìm thấy tên ${employeeId} trong Google Sheets.`);
        return;
      }
      let columnIndex = data[0].indexOf(process.env.FIELD_ACCEPT_REQUEST);

      if (columnIndex === -1) {
        console.log(`Không tìm thấy cột ${field} trong Google Sheets.`);
        return;
      }

      let range = `Request!${String.fromCharCode(65 + columnIndex)}${rowIndex + 1}`;
      console.log('range', range);
      const response = await insertAccpetRequest([values], range);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { getSendAllRequestService, getSendRequestService, PostSendRequestService, InsertServices };
