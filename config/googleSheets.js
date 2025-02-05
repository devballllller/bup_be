const { google } = require('googleapis');
const path = require('path');

// Rest sheet

const KEY_FILE_PATH = path.join(__dirname, '../subtle-lambda-438005-m6-9c5ab8ef5764.json');
const SPREADSHEET_ID_REST = '12IdVLhUNYU57tEZ6kE-DVtrZyhcAmlReG73pRUDI-WY';
const RANGE_REST = '2024!B5:AG1000';

const sheets_Rest = google.sheets('v4');

async function getAuthClient_Rest() {
  return new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  }).getClient();
}

// Bang luong sheet
const SPREADSHEET_ID_SALARY = '19kkq6pjdQe6bIm9aq_MPpdVKJlntYRh0DLnlBvoBaKU';
const RANGE_SALARY = 'Users!A2:AG1000';

const sheets_Salary = google.sheets('v4');

async function getAuthClient_Salary() {
  return new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  }).getClient();
}

module.exports = { sheets_Rest, SPREADSHEET_ID_REST, RANGE_REST, getAuthClient_Rest, SPREADSHEET_ID_SALARY, RANGE_SALARY, sheets_Salary, getAuthClient_Salary };
