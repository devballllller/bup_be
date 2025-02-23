const { google } = require('googleapis');
const path = require('path');

const sheets = google.sheets('v4');
const KEY_FILE_PATH = path.join(__dirname, '../subtle-lambda-438005-m6-9c5ab8ef5764.json');

// Danh sách bảng tính và phạm vi dữ liệu
const SHEETS_CONFIG = {
  REST: { id: '12IdVLhUNYU57tEZ6kE-DVtrZyhcAmlReG73pRUDI-WY', range: '2024!B5:AG1000' },
  SALARY: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Users!A2:AG1000' },

  REQUEST: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Request!A2:AG1000' },
  REQUEST_INSERT: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Request!A1:AG1000' },
  ACCEPT_REQUEST: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Salary!A1:AG1000' },

  TIMEKEEPING_INDEX: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Timekeeping!A6:AY1000' },
  TIMEKEEPING: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Timekeeping!A8:AY1000' },

  THACH_INDEX: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'THACH!A1:AH1000' },
  THACH: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'THACH!A2:AH1000' },

  HUY_ATTENDANCE: { id: '1BXmuj4q2yv_jcJiDj0qW0kEPCzDhR-BoChOQGrvkZKA', range: 'T2!A8:AH1000' },
  HUY_ATTENDANCE_INDEX: { id: '1BXmuj4q2yv_jcJiDj0qW0kEPCzDhR-BoChOQGrvkZKA', range: 'T2!A7:AH1000' },
  HUY_ATTENDANCE_SALARY: { id: '1BXmuj4q2yv_jcJiDj0qW0kEPCzDhR-BoChOQGrvkZKA', range: 'T2!E1:G5' },
  HUY_LOGS: { id: '1BXmuj4q2yv_jcJiDj0qW0kEPCzDhR-BoChOQGrvkZKA', range: 'Logs!A1:AH1000' },

  // khác loài
  BI: { id: '1FZ03fq2DBjYKKTj-llK6Z3ddQhd1qGwdueIARwgWCKY', range: 'bi!A1:AH1000' },
};

// Hàm lấy client xác thực Google Sheets API
async function getAuthClient() {
  return new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }).getClient();
}

module.exports = { sheets, SHEETS_CONFIG, getAuthClient };
