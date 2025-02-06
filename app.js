const express = require('express');
const cors = require('cors');
const sheetRoutes = require('./routes/sheetRoutes');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', sheetRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
