const { getSheetDataSalary } = require('./sheetService');

async function findValuesByNameAndPassword(phone, password) {
  const data = await getSheetDataSalary();

  const filteredData = data.filter((row) => row[2] == phone && row[4] == password);
  console.log(filteredData[0]);
  return filteredData[0];
}

module.exports = { findValuesByNameAndPassword };
