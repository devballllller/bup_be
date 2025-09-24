const express = require('express');
const cors = require('cors');
const sheetRoutes = require('./routes/sheetRoutes');
require('dotenv').config();
const http = require('http'); // Tạo HTTP server
const WebSocketManager = require('./config/websocket/websocketConfig'); // Import WebSocket manager

const app = express();
const port = 3999;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', sheetRoutes);

// Tạo HTTP server để WebSocket có thể sử dụng chung
const server = http.createServer(app);

// Khởi động WebSocket Server
WebSocketManager.setup(server);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// const express = require('express');
// const cors = require('cors');
// const sheetRoutes = require('./routes/sheetRoutes');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api', sheetRoutes);

// // Thêm route gốc để test
// app.get("/", (req, res) => {
//   res.send("Server is running on Vercel 🚀");
// });

// // module.exports = app;

// module.exports = (req, res) => {
//   return app(req, res);
// };
