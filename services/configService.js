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
      return [];
    }

    return res.data.values;
  } catch (error) {
    console.error(`Error fetching data for ${sheetKey}:`, error);
    return [];
  }
}

async function appendData(sheetKey, values, range) {
  try {
    if (!SHEETS_CONFIG[sheetKey]) {
      throw new Error(`Invalid sheet key: ${sheetKey}`);
    }

    const formattedValues = Array.isArray(values[0]) ? values : [values];

    const auth = await getAuthClient();
    const res = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: SHEETS_CONFIG[sheetKey].id,
      range: SHEETS_CONFIG[sheetKey].range,
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

async function updateData(sheetKey, values, range) {
  console.log(sheetKey, values, range);
  try {
    if (!SHEETS_CONFIG[sheetKey]) {
      throw new Error(`Invalid sheet key: ${sheetKey}`);
    }

    const formattedValues = Array.isArray(values[0]) ? values : [values];

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

async function allUserRest() {
  return await getSheetData('REST');
}

async function allUserSalary() {
  return await getSheetData('SALARY');
}

// ----------------REQUEST CÓ ĐẦY ĐỦ TỪ DÒNG TỚI GIÁ TRỊ

async function allRequest() {
  return await getSheetData('REQUEST');
}

async function sendRequest(data) {
  return await appendData('REQUEST', data);
}

// ----------------REQUEST CHỈ INSERT KHÔNG CÓ DÒNG ĐẦU

async function allSendRequest() {
  return await getSheetData('REQUEST_INSERT');
}

async function insertAccpetRequest(values, range) {
  return await updateData('REQUEST_INSERT', values, range);
}

// ----------------TEST
async function allRequestAccept() {
  return await getSheetData('ACCEPT_REQUEST');
}

async function appendRestTEST(values, range) {
  return await appendData('ACCEPT_REQUEST', values, range);
}

// ----------------TEST
async function allTimekeeping() {
  return await getSheetData('TIMEKEEPING_INDEX');
}

async function insertTimekeeping(values, range) {
  return await updateData('TIMEKEEPING_INDEX', values, range);
}
// ----------------BI

async function sendRequestBI(data) {
  return await appendData('BI', data);
}

// ----------------THACH

async function getAllProductThach() {
  return await getSheetData('THACH');
}

async function appendProductThach(data) {
  return await appendData('THACH', data);
}

async function insertProductThach(values, range) {
  return await updateData('THACH', values, range);
}

async function appendPresentThach(data) {
  return await appendData('THACH_PRESENT_STATUS', data);
}

async function getPresentThach() {
  return await getSheetData('THACH_PRESENT_STATUS_GET');
}

async function getStyleThach() {
  return await getSheetData('THACH_STYLE_HAT_GET');
}

module.exports = {
  insertTimekeeping,
  allTimekeeping,
  getSheetData,
  allUserRest,
  allUserSalary,
  allRequest,
  sendRequest,
  allRequestAccept,
  appendRestTEST,
  insertAccpetRequest,
  updateData,
  allSendRequest,
  sendRequestBI,
  getAllProductThach,
  appendProductThach,
  appendPresentThach,
  getPresentThach,
  getStyleThach,
  insertProductThach,
};
