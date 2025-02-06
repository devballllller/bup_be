const { allRequest, sendRequest } = require('./configService');
const { generateCode } = require('../constants');

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

async function PostSendRequestService(name, employeeId) {
  return new Promise(async (resolve, reject) => {
    try {
      const uuid = generateCode();
      console.log(uuid);
      const user = [uuid, employeeId, employeeId, employeeId, employeeId];

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

module.exports = { getSendAllRequestService, getSendRequestService, PostSendRequestService };
