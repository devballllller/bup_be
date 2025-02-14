const { sheets, SHEETS_CONFIG, getAuthClient } = require('../config/googleSheets');

async function getSheetData(sheetKey) {
  try {
    console.log(`Fetching data for: ${sheetKey}`);

    if (!SHEETS_CONFIG[sheetKey]) throw new Error(`Invalid sheet key: ${sheetKey}`);

    const auth = await getAuthClient();
    const res = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: SHEETS_CONFIG[sheetKey].id,
      range: SHEETS_CONFIG[sheetKey].range,
    });

    if (!res.data || !res.data.values) {
      console.warn(`No data found for ${sheetKey}`);
      return []; // Tránh lỗi khi truy cập `.values`
    }

    return res.data.values;
  } catch (error) {
    console.error(`Error fetching data for ${sheetKey}:`, error);
    return []; // Trả về mảng rỗng để tránh crash
  }
}

// Hàm ghi dữ liệu vào Google Sheets
async function appendData(sheetKey, values, range) {
  try {
    // Kiểm tra sheetKey hợp lệ
    if (!SHEETS_CONFIG[sheetKey]) {
      throw new Error(`Invalid sheet key: ${sheetKey}`);
    }

    // Đảm bảo values luôn là mảng 2D
    const formattedValues = Array.isArray(values[0]) ? values : [values];

    console.log(SHEETS_CONFIG[sheetKey].id, formattedValues, range);

    const auth = await getAuthClient();
    const res = await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId: SHEETS_CONFIG[sheetKey].id,
      range: range,
      valueInputOption: 'RAW',
      resource: { values: formattedValues },
    });

    if (!res.data) {
      console.warn(`No data found for ${sheetKey}`);
      return [];
    }

    return res.data;
  } catch (error) {
    console.error(`Error appending data for ${sheetKey}:`, error.message);
    return [];
  }
}

// Tất cả dữ liệu theo tên trong bảng Rest
async function allUserRest() {
  return await getSheetData('REST');
}

// Tất cả dữ liệu theo tên trong bảng Salary
async function allUserSalary() {
  return await getSheetData('SALARY');
}

// Tất cả dữ liệu theo tên trong bảng Chấm công
async function allRequest() {
  return await getSheetData('REQUEST');
}

// Tất cả dữ liệu theo tên trong bảng Chấm công
async function sendRequest(data) {
  return await appendData('REQUEST', data);
}

// Tất cả dữ liệu theo tên trong bảng Chấm công
async function insertAccpetRequest(values, range) {
  return await appendData('REQUEST', values, range);
}

// Tất cả dữ liệu theo tên trong bảng Chấm công
async function allRequestAccept() {
  return await getSheetData('ACCEPT_REQUEST');
}

// Tất cả dữ liệu theo tên trong bảng Chấm công
async function appendRestTEST(values, range) {
  return await appendData('ACCEPT_REQUEST', values, range);
}

module.exports = { getSheetData, allUserRest, allUserSalary, allRequest, sendRequest, allRequestAccept, appendRestTEST, insertAccpetRequest };
