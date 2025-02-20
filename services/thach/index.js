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

module.exports = { getAllProductThachServices, appendProductThachServices };
