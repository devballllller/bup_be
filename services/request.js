const { allRequest, sendRequest, insertAccpetRequest, allSendRequest } = require('./configService');
const { generateCode, getCurrentTime } = require('../constants');

// Tìm dữ liệu theo tên trong bảng Salary
async function getSendAllRequestService() {
  const allEmployee = await allRequest();
  return allEmployee;
}

async function getSendRequestService(employeeId) {
  const allEmployee = await allRequest();
  const data = allEmployee?.filter((empId) => empId[2] == employeeId);
  return data;
}

async function PostSendRequestService(name, employeeId, TypeRequest, Request, Image) {
  return new Promise(async (resolve, reject) => {
    try {
      const uuid = generateCode();
      const timestamp = getCurrentTime();
      const user = [uuid, TypeRequest, employeeId, Request, Image, 'FALSE', timestamp];

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

async function InsertServices(requestId, values, field) {
  console.log(requestId, values, field);
  return new Promise(async (resolve, reject) => {
    try {
      const data = await allSendRequest();
      console.log(data, 'data');
      let rowIndex = data.findIndex((row) => row[0] == requestId);

      if (rowIndex === -1) {
        console.log(`Không tìm thấy tên ${requestId} trong Google Sheets.`);
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
