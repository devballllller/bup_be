const { allUser, allUserCheckField, allUserUpdate, allLogsAppendH, allSalaryH } = require('./configService');
// --------------------------------- login

async function getAllAttendanceServices() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await allSalaryH();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// --------------------------------- attendance
async function getAllAttendanceServicesCheckField() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await allUserCheckField();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

async function insertAttendance(values, range) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await allUserUpdate(values, range);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

async function appendAttendance(values, range) {
  return new Promise(async (resolve, reject) => {
    const data = await allLogsAppendH(values, range);
    resolve(data);
    try {
    } catch (error) {
      reject(error);
    }
  });
}

async function allSalaryHServices() {
  return new Promise(async (resolve, reject) => {
    const data = await allSalaryH();
    resolve(data);
    try {
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { getAllAttendanceServices, getAllAttendanceServicesCheckField, insertAttendance, appendAttendance, allSalaryHServices };
