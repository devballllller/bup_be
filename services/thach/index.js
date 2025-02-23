const { appendProductThach, getAllProductThach } = require('../configService');
const { locationCell } = require('../../config/thach/locationCell');

// lấy tất cả các sảm phẩm các chuyền
async function getAllProductThachServices() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getAllProductThach();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// lấy tất cả các sản phẩm lọc theo chuyền lọc theo ngày
async function getfilterProductThachServices(sewingName, date) {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await getAllProductThach();
      console.log(sewingName, date, rows);
      const data = rows.filter((row) => row[locationCell.SEWING_NAME] == sewingName && row[locationCell.DATE] == date);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// lấy filter các product name
async function getfilterProductNameThachServices(sewingName) {
  return new Promise(async (resolve, reject) => {
    try {
      const getField = [];
      const rows = await getAllProductThach();
      rows.map((row) => getField.push(row[1]));

      const data = new Set(getField);
      const backToArray = [...data];

      // console.log(backToArray);
      resolve(backToArray);
    } catch (error) {
      reject(error);
    }
  });
}

// thêm sản phẩm vào
async function appendProductThachServices(sewingName, productName, date, timeLine, actualValue, productReceive, productAccept, productFails) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(sewingName, productName, date, timeLine, actualValue, productReceive, productAccept, productFails);
      const data = await appendProductThach([sewingName, productName, date, timeLine, actualValue, productReceive, productAccept, productFails]);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { getAllProductThachServices, appendProductThachServices, getfilterProductThachServices, getfilterProductNameThachServices };
