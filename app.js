const { google } = require('googleapis');
const path = require('path');
const cors = require('cors');

const KEY_FILE_PATH = path.join(__dirname, 'subtle-lambda-438005-m6-9c5ab8ef5764.json');
const SPREADSHEET_ID = '1bryAfC8RNKOVrHSwqfmPNQ1KIZjueQYEtqSTW9vQLQg';
const RANGE = 'Sheet1!A2:Z1000';

const sheets = google.sheets('v4');

async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();

  const res = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
  });

  return res.data.values;
}

async function findValuesByName(name) {
  const data = await getSheetData();

  const rows = data.filter((row) => row[0]?.toLowerCase() === name.toLowerCase());
  return rows.length > 0 ? rows[0] : null;
}

const express = require('express');
const app = express();
const port = 3001;

// Sử dụng CORS middleware để cho phép yêu cầu từ các domain khác
app.use(cors());

app.get('/api/find-value', async (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await findValuesByName(name);
    console.log(rows);

    if (rows) {
      res.status(200).json({ data: rows, status: 200 });
    } else {
      res.status(404).json({ error: 'Không tìm thấy tên trong bảng tính.' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu từ Google Sheets.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
