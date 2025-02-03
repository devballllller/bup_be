const { google } = require('googleapis');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const KEY_FILE_PATH = path.join(__dirname, 'subtle-lambda-438005-m6-9c5ab8ef5764.json');
const SPREADSHEET_ID = '12IdVLhUNYU57tEZ6kE-DVtrZyhcAmlReG73pRUDI-WY';
const RANGE = '2024!B9:AG1000';

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
  console.log(data[1]);
  const rows = data.filter((row) => row[1]?.toLowerCase() === name.toLowerCase());
  return rows.length > 0 ? rows[0] : null;
}

const express = require('express');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau 15 phút.' },
  statusCode: 429,
  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      error: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút.',
    });
  },
});

app.post('/api/find-value', limiter, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Tên không được phép rỗng.' });
  }

  try {
    const rows = await findValuesByName(name);
    console.log(rows);

    if (rows && rows.length > 0) {
      res.status(200).json({
        data: {
          EmployeeId: rows[0],
          EmployeeName: rows[1],
          // position: rows[5],
          jan: rows[16],
          feb: rows[17],
          mar: rows[18],
          apr: rows[19],
          may: rows[20],
          jun: rows[21],
          jul: rows[22],
          aug: rows[23],
          sep: rows[24],
          oct: rows[25],
          nov: rows[26],
          dec: rows[27],
          restUse: rows[28],
          restNotUse: rows[30],
        },
        status: 200,
      });
    } else {
      res.status(404).json({ error: 'Không tìm thấy tên trong bảng tính.' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Lỗi khi truy xuất dữ liệu.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
