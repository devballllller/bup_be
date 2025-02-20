const { appendProductThach, getAllProductThach } = require('../configService');

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

async function getfilterProductThachServices(sewingName, productName, date) {
  return new Promise(async (resolve, reject) => {
    try {
      const rows = await getAllProductThach();
      const data = rows.filter((row) => row[0] == sewingName && row[1] == productName && row[2] == date);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

async function getfilterProductNameThachServices() {
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
