const { sendRequestBI } = require('../configService');

async function biPostEmployeeService(name, dob, cccd, cmnd, address) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(name, dob, cccd, cmnd, address);

      const response = await sendRequestBI([name, dob, cccd, cmnd, address]);

      resolve(response);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
}

module.exports = { biPostEmployeeService };
