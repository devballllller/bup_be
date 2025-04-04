const { appendProductThach, getAllProductThach, appendPresentThach, getPresentThach, getStyleThach, insertProductThach, getAllProductThachBao } = require('../configService');
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

      // const rows = await getAllProductThachBao();
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
async function appendProductThachServices(sewingName, productName, date, timeLine, actualValue, productReceive, productAccept, productFails, dayTarget, timeStampValue) {
  return new Promise(async (resolve, reject) => {
    try {
      const allDataProduct = await getAllProductThach();

      const dataFilter = allDataProduct.findIndex((els) => els[0] == sewingName && els[3] == date && els[4] == timeLine);

      if (dataFilter == -1) {
        await appendProductThach([sewingName, productName, dayTarget, date, timeLine, actualValue, productReceive, productAccept, productFails, timeStampValue]);
      } else {
        const rangeInsert = `THACH!A${dataFilter + 2}`;
        await insertProductThach([sewingName, productName, dayTarget, date, timeLine, actualValue, productReceive, productAccept, productFails, timeStampValue], rangeInsert);
      }
      resolve({
        data: {},
        message: 'Thêm thành công',
        success: true,
      });
    } catch (error) {
      reject(error);
    }
  });
}

// thêm sản
async function appendPresentThachServices(sewingName, date, present, absent) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await appendPresentThach([sewingName, date, present, absent]);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// thêm sản phẩm vào
async function getPresentThachServices(sewingName, date) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getPresentThach(sewingName, date);
      console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// thêm sản phẩm vào
async function getStyleThachServices(styleHat) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await getStyleThach();

      data = data.filter((els) => els[0] == styleHat);

      data = { imageLink: data[0][1] };
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = {
  getPresentThachServices,
  appendPresentThachServices,
  getAllProductThachServices,
  appendProductThachServices,
  getfilterProductThachServices,
  getfilterProductNameThachServices,
  getStyleThachServices,
};
