const {
  sheets_Rest,
  SPREADSHEET_ID_REST,
  RANGE_REST,
  getAuthClient_Rest,
  SPREADSHEET_ID_SALARY,
  RANGE_SALARY,
  sheets_Salary,
  getAuthClient_Salary,
} = require('../config/googleSheets');

async function getSheetDataRest() {
  const auth = await getAuthClient_Rest();
  const res = await sheets_Rest.spreadsheets.values.get({
    auth,
    spreadsheetId: SPREADSHEET_ID_REST,
    range: RANGE_REST,
  });

  return res.data.values;
}

async function getSheetDataSalary() {
  const auth = await getAuthClient_Salary();
  const res = await sheets_Salary.spreadsheets.values.get({
    auth,
    spreadsheetId: SPREADSHEET_ID_SALARY,
    range: RANGE_SALARY,
  });

  return res.data.values;
}

async function findValuesByName(name) {
  const data = await getSheetDataRest();
  console.log(data[1]);
  return data.filter((row) => row[1]?.toLowerCase() === name.toLowerCase());
}

async function findValuesByNameSalary(name) {
  const data = await getSheetDataSalary();
  console.log(data[1]);

  return data.filter((row) => row[1]?.toLowerCase() === name.toLowerCase());
}

module.exports = { getSheetDataRest, getSheetDataSalary, findValuesByName, findValuesByNameSalary };
