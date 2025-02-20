const { sendRequestBI } = require('../configService');

async function biPostEmployeeService(name, gender, dob, phone, permanentaddress, currentaddress, cmnd, cccd, issueddate, SIC, SIB, PITC) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(name, gender, dob, phone, permanentaddress, currentaddress, cmnd, cccd, issueddate, SIC, SIB, PITC);

      const response = await sendRequestBI([name, gender, dob, phone, permanentaddress, currentaddress, cmnd, cccd, issueddate, SIC, SIB, PITC]);

      resolve(response);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
}

module.exports = { biPostEmployeeService };
