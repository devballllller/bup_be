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

// lấy tất cả danh về lỗi và top
async function getFailureServices(sewingNameProps, dateProps) {
  try {
    const [response1, response2] = await Promise.all([getFailureThach(), getFailureImageThach()]);

    // get image trước
    const data2_start_v1 = response2.filter(([sewingName, , , date]) => sewingName == sewingNameProps && date == dateProps);

    const data2_last_v1 =
      data2_start_v1.length > 0
        ? data2_start_v1.map((els) => ({
            sewingName: els[0],
            productName: els[1],
            timeLine: els[2],
            date: els[3],
            name_failure1: els[4],
            url_failure1: els[5],
            name_failure2: els[6],
            url_failure2: els[7],
            name_failure3: els[8],
            url_failure3: els[9],
          }))
        : null;

    // lọc dữ liệu từ response1 tức là các lỗi nặng nhe
    // sau đó rãi top lỗi vào data1
    const data1 = response1
      .filter(([sewingName, , , date]) => sewingName == sewingNameProps && date == dateProps)
      .map(([sewingName, productName, timeLine, date, quatity, name_failure, level]) => ({
        sewingName,
        productName,
        timeLine,
        date,
        quatity,
        name_failure,
        level,
      }));

    // tạo 1 cái map
    const myMap = new Map();

    let index = 0;

    data1.forEach((els) => {
      if (myMap.has(els.timeLine)) {
        if (els.level == 'Nặng') {
          myMap.get(els.timeLine).failureHuge += Number(els.quatity);
        } else {
          myMap.get(els.timeLine).failureSmall += Number(els.quatity);
        }
      } else {
        myMap.set(els.timeLine, {
          ...els,
          failureHuge: els.level == 'Nặng' ? Number(els.quatity) : 0,
          failureSmall: els.level == 'Nhẹ' ? Number(els.quatity) : 0,
          name_failure_array: {
            name_failure1: data2_last_v1[index]?.name_failure1,
            name_failure2: data2_last_v1[index]?.name_failure2,
            name_failure3: data2_last_v1[index]?.name_failure3,
          },
        });
        index++;
      }
    });

    const myMapConverrt = Array.from(myMap.values());

    // lọia 2
    const data2_start = data2_start_v1.pop();
    const data2_last = data2_start
      ? {
          sewingName: data2_start[0],
          productName: data2_start[1],
          timeLine: data2_start[2],
          date: data2_start[3],
          name_failure1: data2_start[4],
          url_failure1: data2_start[5],
          name_failure2: data2_start[6],
          url_failure2: data2_start[7],
          name_failure3: data2_start[8],
          url_failure3: data2_start[9],
        }
      : null;

    const a = data1.filter((els) => els.timeLine == data2_last.timeLine);

    let data2 = a.filter((els) => els.name_failure == data2_last.name_failure1 || els.name_failure == data2_last.name_failure2 || els.name_failure == data2_last.name_failure3);
    data2 = data2.sort((a, b) => b.quatity - a.quatity);

    data2.forEach((els, index) => {
      data2_last[`quatity_failure${index + 1}`] = els.quatity;
    });

    console.log(myMapConverrt, data2_last);
    return { data1: myMapConverrt, data2: data2_last };
  } catch (error) {
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
