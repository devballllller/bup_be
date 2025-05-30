const { cloudinary } = require('../../config/thach/cloudinaryConfig');
const { getAccessToken } = require('../../config/thach/getAccessToken');
const axios = require('axios');

const {
  appendProductThach,
  getAllProductThach,
  appendPresentThach,
  getPresentThach,
  getStyleThach,
  insertProductThach,
  getAllProductThachBao,
  getAuthThach,
  getTargetThach,
  appendTargetThach,
  getTotalManThach,
  insertTotalManThach,
  getFailureThach,
  appendFailureThach,
  appendFailureImageThach,
  getFailureImageThach,
} = require('../configService');
const { locationCell } = require('../../config/thach/locationCell');
const { enumTarget, enumManPCSSALARY } = require('../../constants/enumValue');

// login
async function getLoginThachServices(requestData) {
  return new Promise(async (resolve, reject) => {
    try {
      const { phone, password } = requestData;
      const respone = await getAuthThach();

      const data = respone.map(([phone, password]) => ({
        phone,
        password,
      }));

      const dataCheck = data.filter((els) => els.phone == phone && els.password == password);
      if (dataCheck.length > 0) {
        resolve(dataCheck);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
}

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

      resolve(backToArray);
    } catch (error) {
      reject(error);
    }
  });
}

// thêm sản phẩm vào
async function appendProductThachServices(sewingName, productName, date, timeLine, productReceive, productAccept, productFails, dayTarget, timeStampValue, sewingNameMan) {
  try {
    // 1. Lấy tất cả các sản lượng
    const allDataProduct = await getAllProductThach();
    // tìm dòng: theo tên - theo ngày - theo line
    const rowIndex = allDataProduct.findIndex((row) => row[0] === sewingName && row[3] === date && row[4] === timeLine);

    // giá trị mong đợi và dữ liệu insert
    const actualValue = Math.round(Number(dayTarget) / 8);
    const rowData = [sewingName, productName, dayTarget, date, timeLine, actualValue, productReceive, productAccept, productFails, timeStampValue, sewingNameMan];

    // format ngày
    const [year, month, day] = date.split('-');

    let sumAccept = 0;

    // nếu không có thì tọa mới
    if (rowIndex === -1) {
      const rowIndexArray = allDataProduct?.filter((row) => row[0] === sewingName && row[3] === date && row[1] == productName);
      rowIndexArray?.map((els) => {
        sumAccept += Number(els[7]);
      });

      await appendProductThach(rowData);
      const diff = Math.abs(Number(sumAccept) + Number(productAccept));
      console.log('first');
      await postManPSCSALARYServices(day, month, sewingNameMan, productName, diff);
    }
    // ngược lại là cập nhật
    else {
      // const rowIndexArray = allDataProduct?.filter((row) => row[0] === sewingName && row[3] === date);
      const rowIndexArray = allDataProduct?.filter((row) => row[0] === sewingName && row[3] === date && row[1] == productName);
      rowIndexArray?.map((els) => {
        sumAccept += Number(els[7]);
      });
      const prevAccept = Number(allDataProduct[rowIndex][7] || 0);
      const diff = Math.abs(Number(sumAccept) - Number(prevAccept) + Number(productAccept));
      const range = `THACH!A${rowIndex + 2}`;
      await insertProductThach(rowData, range);
      console.log('second');

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
async function getPresentThachServices() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getPresentThach();

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

// Service
async function getStyleThachServices(styleHat) {
  try {
    const accessToken = await getAccessToken();
    const data = await getStyleThach();

    const matched = data?.filter((els) => els[0] == styleHat);
    if (!matched?.length) return null;

    const imageLink = matched[0][1];
    if (!imageLink) return null;

    const fileIdMatch = imageLink.match(/\/d\/([^/]+)\//);
    if (!fileIdMatch) {
      console.error('Không lấy được fileId từ URL:', imageLink);
      return null;
    }
    const fileId = fileIdMatch[1];

    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
      responseType: 'arraybuffer',
    });

    return {
      data: response.data,
      mimeType: response.headers['content-type'] || 'image/png',
    };
  } catch (error) {
    console.error('Lỗi khi fetch ảnh:', error?.response?.data || error.message);
    return null;
  }
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
    console.log(`${month}${enumManPCSSALARY.NAMESHEET}`);
    const response = await getTotalManThach(`${month}${enumManPCSSALARY.NAMESHEET}`);

    const columnIndex = response[0].indexOf(day);

    const productNameSplit = productName?.split(' ')[0];

    let rowIndex = response.findIndex((row) =>
      sewingNameMan === 'Baller 1' || sewingNameMan === 'Baller 2' ? row[0] === sewingNameMan : row[0] === sewingNameMan && row[2] === productNameSplit,
    );

    console.log(columnIndex, rowIndex);
    if (columnIndex !== -1 && rowIndex !== -1) {
      const colLetter = numberToColumnLetter(columnIndex);
      const range = `${month}${enumManPCSSALARY.PARTNAME}${colLetter}${rowIndex + 7}`;

      console.log(range);
      await insertTotalManThach([productAccept], range);
    }

    return [];
  } catch (error) {
    throw error;
  }
}

// thêm VÀO PCS SALARY MẪN
async function uploadServices(filePath) {
  return cloudinary.uploader.upload(filePath, {
    folder: 'uploads',
  });
}

async function getFailureServices(sewingName, date) {
  try {
    const [failures, failureImages] = await Promise.all([getFailureThach(), getFailureImageThach()]);

    const filteredFailures = failures
      .filter(([sName, , , fDate]) => sName === sewingName && fDate === date)
      .map(([sName, productName, timeLine, fDate, quantity, name_failure, level]) => ({
        sewingName: sName,
        productName,
        timeLine,
        date: fDate,
        quantity: Number(quantity),
        name_failure,
        level,
      }));

    const filteredFailureImages = failureImages
      .filter(([sName, , , fDate]) => sName === sewingName && fDate === date)
      .map(([sName, productName, timeLine, fDate, nf1, url1, nf2, url2, nf3, url3]) => ({
        sewingName: sName,
        productName,
        timeLine,
        date: fDate,
        name_failure1: nf1,
        url_failure1: url1,
        name_failure2: nf2,
        url_failure2: url2,
        name_failure3: nf3,
        url_failure3: url3,
      }));

    // Map timeline -> tổng hợp lỗi nặng/nhẹ và hình ảnh
    const summaryMap = new Map();

    for (const fail of filteredFailures) {
      const current = summaryMap.get(fail.timeLine) || {
        ...fail,
        failureHuge: 0,
        failureSmall: 0,
        name_failure_array: {},
      };

      if (fail.level === 'Nặng') current.failureHuge += fail.quantity;
      else current.failureSmall += fail.quantity;

      // Gán hình ảnh tương ứng nếu chưa có
      if (!current.name_failure_array.name_failure1) {
        const imageEntry = filteredFailureImages.find((img) => img.timeLine === fail.timeLine);
        if (imageEntry) {
          current.name_failure_array = {
            name_failure1: imageEntry.name_failure1,
            name_failure2: imageEntry.name_failure2,
            name_failure3: imageEntry.name_failure3,
          };
        }
      }

      summaryMap.set(fail.timeLine, current);
    }

    const data1 = Array.from(summaryMap.values());

    // Phân tích top lỗi của timeline cuối
    const lastTimelineImage = filteredFailureImages[filteredFailureImages.length - 1];
    const topFailures = filteredFailures
      .filter((f) => f.timeLine === lastTimelineImage?.timeLine)
      .filter((f) => [lastTimelineImage?.name_failure1, lastTimelineImage?.name_failure2, lastTimelineImage?.name_failure3].includes(f.name_failure))
      .sort((a, b) => b.quantity - a.quantity);

    const data2 = {
      ...lastTimelineImage,
    };

    topFailures.forEach((item, index) => {
      data2[`quatity_failure${index + 1}`] = item.quantity;
    });

    return { data1, data2 };
  } catch (error) {
    console.error('Error in getFailureServices:', error);
    throw error;
  }
}

// thêm VÀO PCS SALARY MẪN
async function postFailureNumberServices(bodyData) {
  try {
    const { sewingName, productName, timeLine, date, arrayLists, arrayImages } = bodyData;

    let dataRequest = [];
    for (const arrayList of arrayLists) {
      let dataRequest = [sewingName, productName, timeLine, date, arrayList.quatity, arrayList.name_link, arrayList.level];
      await appendFailureThach(dataRequest);
    }
    // const promises = arrayLists.map(({ quatity, name_link, level }) => appendFailureThach([sewingName, productName, timeLine, date, quatity, name_link, level]));
    // await Promise.all(promises);

    dataRequest = [
      sewingName,
      productName,
      timeLine,
      date,
      arrayImages.name_link1,
      arrayImages.img_link1,
      arrayImages.name_link2,
      arrayImages.img_link2,
      arrayImages.name_link3,
      arrayImages.img_link3,
    ];
    await appendFailureImageThach(dataRequest);

    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getLoginThachServices,
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
  uploadServices,
  getFailureServices,
  postFailureNumberServices,
};
