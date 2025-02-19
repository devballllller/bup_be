const { sheets, SHEETS_CONFIG, getAuthClient } = require('../../config/googleSheets');

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

async function allUser() {
  return await getSheetData('HUY_ATTENDANCE');
}

async function allUserUpdate(values, range) {
  return await updateData('HUY_ATTENDANCE', values, range);
}

//
async function allUserCheckField() {
  return await getSheetData('HUY_ATTENDANCE_INDEX');
}
//

async function allLogsH() {
  return await getSheetData('HUY_LOGS');
}

async function allLogsAppendH(values, range) {
  return await appendData('HUY_LOGS', values, range);
}

//

async function allSalaryH() {
  return await getSheetData('HUY_ATTENDANCE_SALARY');
}

module.exports = { allUser, allLogsAppendH, allUserUpdate, allUserCheckField, allLogsH, allSalaryH };
