const { sendRequestBI } = require('../configService');

async function biPostEmployeeService(name, dob, cccd, cmnd) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await sendRequestBI([name, dob, cccd, cmnd]);

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { biPostEmployeeService };
