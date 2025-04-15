const {
  appendProductThach,
  getAllProductThach,
  appendPresentThach,
  getPresentThach,
  getStyleThach,
  insertProductThach,
  getAllProductThachBao,
  getTargetThach,
  appendTargetThach,
  getTotalManThach,
  insertTotalManThach,
} = require('../configService');
const { locationCell } = require('../../config/thach/locationCell');
const { enumTarget, enumManPCSSALARY } = require('../../constants/enumValue');

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
async function appendProductThachServices(sewingName, productName, date, timeLine, productReceive, productAccept, productFails, dayTarget, timeStampValue, sewingNameMan) {
  try {
    const allDataProduct = await getAllProductThach();
    const rowIndex = allDataProduct.findIndex((row) => row[0] === sewingName && row[3] === date && row[4] === timeLine);

    const actualValue = Math.round(Number(dayTarget) / 8);
    const rowData = [sewingName, productName, dayTarget, date, timeLine, actualValue, productReceive, productAccept, productFails, timeStampValue, sewingNameMan];

    const [year, month, day] = date.split('-');

    if (rowIndex === -1) {
      await appendProductThach(rowData);
      await postManPSCSALARYServices(day, month, sewingNameMan, productName, productAccept);
    } else {
      const prevAccept = Number(allDataProduct[rowIndex][7] || 0);
      const diff = Math.abs(productAccept - prevAccept);
      const range = `THACH!A${rowIndex + 2}`;

      await insertProductThach(rowData, range);
      await postManPSCSALARYServices(day, month, sewingNameMan, productName, diff);
    }

    return {
      data: {},
      message: 'Thêm thành công',
      success: true,
    };
  } catch (error) {
    throw error;
  }
}

// thêm người đi làm vắng mặt
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

// thêm target
async function thachPostTargetServices(line, date, dayTarget, timeStampValue) {
  return new Promise(async (resolve, reject) => {
    try {
      const dataRequest = [line, date, dayTarget, timeStampValue];

      await appendTargetThach(dataRequest);

      resolve([]);
    } catch (error) {
      reject(error);
    }
  });
}

function compaDate(data) {
  const sortedRows = data.sort((a, b) => new Date(b[1]) - new Date(a[1]));

  return sortedRows;
}

function compaDateLineDay(data) {
  const latestByLine = {};

  data.forEach((row) => {
    const [line, dateStr] = row;
    const date = new Date(dateStr);

    if (!latestByLine[line] || new Date(latestByLine[line][1]) < date) {
      latestByLine[line] = row;
    }
  });

  // Convert object to array & sort theo Line 1 -> Line 6
  return Object.values(latestByLine).sort((a, b) => a[0].localeCompare(b[0]));
}

// thêm target
async function getTargetThachServices(sewingName, date) {
  return new Promise(async (resolve, reject) => {
    try {
      const respone = await getTargetThach();
      let data = compaDate(respone);

      data = data.filter((els) => els[enumTarget.LINE] == sewingName);

      if (data?.length > 0) {
        data = data[0][2];
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// thêm target
async function thachGetTargetServices() {
  return new Promise(async (resolve, reject) => {
    try {
      const respone = await getTargetThach();
      let data = compaDateLineDay(respone);

      data = data.map((els) => {
        return {
          line: els[0],
          date: els[1],
          dayTarget: els[2],
        };
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function numberToColumnLetter(n) {
  let result = '';
  while (n >= 0) {
    result = String.fromCharCode((n % 26) + 65) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
}

// thêm VÀO PCS SALARY MẪN
async function postManPSCSALARYServices(day, month, sewingNameMan, productName, productAccept) {
  try {
    const response = await getTotalManThach(`${month}${enumManPCSSALARY.NAMESHEET}`);
    const columnIndex = response[0].indexOf(day);

    let rowIndex = response.findIndex((row) =>
      sewingNameMan === 'Baller 1' || sewingNameMan === 'Baller 2' ? row[0] === sewingNameMan : row[0] === sewingNameMan && row[2] === productName,
    );

    if (columnIndex !== -1 && rowIndex !== -1) {
      const currentValue = Number(response[rowIndex][columnIndex] || 0);
      const updatedValue = currentValue + Number(productAccept);

      const colLetter = numberToColumnLetter(columnIndex);
      const range = `${month}${enumManPCSSALARY.PARTNAME}${colLetter}${rowIndex + 7}`;

      await insertTotalManThach([updatedValue], range);
    }

    return [];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getPresentThachServices,
  appendPresentThachServices,
  getAllProductThachServices,
  appendProductThachServices,
  getfilterProductThachServices,
  getfilterProductNameThachServices,
  getStyleThachServices,
  thachPostTargetServices,
  getTargetThachServices,
  thachGetTargetServices,
  postManPSCSALARYServices,
};
