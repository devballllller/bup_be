const { google } = require('googleapis');
const path = require('path');
const { nameOfField } = require('../constants/enumValue');
const sheets = google.sheets('v4');
const KEY_FILE_PATH = path.join(__dirname, '../subtle-lambda-438005-m6-9c5ab8ef5764.json');

// Danh sách bảng tính và phạm vi dữ liệu
const SHEETS_CONFIG = {
  REST: { id: '12IdVLhUNYU57tEZ6kE-DVtrZyhcAmlReG73pRUDI-WY', range: '2024!B5:AG10000' },
  SALARY: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Users!A2:AG10000' },

  REQUEST: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Request!A2:AG10000' },
  REQUEST_INSERT: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Request!A1:AG10000' },
  ACCEPT_REQUEST: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Salary!A1:AG10000' },

  TIMEKEEPING_INDEX: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Timekeeping!A6:AY10000' },
  TIMEKEEPING: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'Timekeeping!A8:AY10000' },

  THACH_INDEX: { id: '1iH5MjPSYG0YYqVyBMo2MxKvjZ1F7qKRQkEPNZ5pjaDQ', range: 'THACH!A1:AH10000' },
  THACH: { id: '1iH5MjPSYG0YYqVyBMo2MxKvjZ1F7qKRQkEPNZ5pjaDQ', range: 'THACH!A2:AH10000' },
  THACH_BAO: { id: '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU', range: 'THACH!A2:AH10000' },
  THACH_PRESENT_STATUS: { id: '1iH5MjPSYG0YYqVyBMo2MxKvjZ1F7qKRQkEPNZ5pjaDQ', range: 'THACH_PRESENT_STATUS!A1:D10000' },
  THACH_PRESENT_STATUS_GET: { id: '1iH5MjPSYG0YYqVyBMo2MxKvjZ1F7qKRQkEPNZ5pjaDQ', range: 'THACH_PRESENT_STATUS!A2:D10000' },
  THACH_STYLE_HAT_GET: { id: '1iH5MjPSYG0YYqVyBMo2MxKvjZ1F7qKRQkEPNZ5pjaDQ', range: 'STYLE_HAT!A1:B1000' },
  THACH_TARGET: { id: '1iH5MjPSYG0YYqVyBMo2MxKvjZ1F7qKRQkEPNZ5pjaDQ', range: 'TARGET!A1:D10000' },

  HUY_ATTENDANCE: { id: '1BXmuj4q2yv_jcJiDj0qW0kEPCzDhR-BoChOQGrvkZKA', range: 'T3!A8:AH10000' },
  HUY_ATTENDANCE_INDEX: { id: '1BXmuj4q2yv_jcJiDj0qW0kEPCzDhR-BoChOQGrvkZKA', range: 'T3!A7:AH10000' },
  HUY_ATTENDANCE_SALARY: { id: '1BXmuj4q2yv_jcJiDj0qW0kEPCzDhR-BoChOQGrvkZKA', range: 'T3!E1:G4' },
  HUY_LOGS: { id: '1BXmuj4q2yv_jcJiDj0qW0kEPCzDhR-BoChOQGrvkZKA', range: 'Logs!A1:AH10000' },

  // khác loài
  BI: { id: '1FZ03fq2DBjYKKTj-llK6Z3ddQhd1qGwdueIARwgWCKY', range: 'bi!A1:AH10000' },
  BI_EMPLOY_INFO: { id: '11cOq5xhFiOvHuVnIN5P2_jj6NmRvT_-THOyYwg_JLgo', range: 'SIM!A5:P1000' },
  BI_VPP: { id: '11cOq5xhFiOvHuVnIN5P2_jj6NmRvT_-THOyYwg_JLgo', range: `${nameOfField.Stationaries}!A2:C1000` },
  BI_REQUEST: { id: '11cOq5xhFiOvHuVnIN5P2_jj6NmRvT_-THOyYwg_JLgo', range: `${nameOfField.RequestStationary}!A2:J1000` },

  BI_DEVICE: { id: '11cOq5xhFiOvHuVnIN5P2_jj6NmRvT_-THOyYwg_JLgo', range: `${nameOfField.Uniform}!A2:C1000` },
  BI_UNIFORM: { id: '11cOq5xhFiOvHuVnIN5P2_jj6NmRvT_-THOyYwg_JLgo', range: `${nameOfField.Devices}!A2:C1000` },
};

// Hàm lấy client xác thực Google Sheets API
async function getAuthClient() {
  return new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }).getClient();
}

module.exports = { sheets, SHEETS_CONFIG, getAuthClient };
