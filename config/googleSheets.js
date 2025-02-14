const { google } = require('googleapis');
const path = require('path');

const sheets = google.sheets('v4');
const KEY_FILE_PATH = path.join(__dirname, '../subtle-lambda-438005-m6-9c5ab8ef5764.json');

// Danh sách bảng tính và phạm vi dữ liệu
const SHEETS_CONFIG = {
  REST: { id: '12IdVLhUNYU57tEZ6kE-DVtrZyhcAmlReG73pRUDI-WY', range: '2024!B5:AG1000' },
  SALARY: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Users!A2:AG1000' },
  REQUEST: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Request!A1:AG1000' },
  ACCEPT_REQUEST: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Salary!A1:AG1000' },
};

// Hàm lấy client xác thực Google Sheets API
async function getAuthClient() {
  return new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }).getClient();
}

module.exports = { sheets, SHEETS_CONFIG, getAuthClient };
