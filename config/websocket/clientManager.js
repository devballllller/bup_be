//clientManager
const WebSocket = require('ws');

class ClientManager {
  constructor() {
    this.clients = new Map();
  }

  addClient(sewingName, ws) {
    if (!sewingName) {
      console.warn('⚠️ sewingName không hợp lệ!');
      return;
    }

    this.clients.set(sewingName, ws);
    console.log(`🔗 Kết nối mới từ sewingName: ${sewingName}`);

    // Xử lý khi client đóng kết nối
    ws.on('close', () => {
      this.removeClient(sewingName);
    });

    ws.on('error', (err) => {
      console.error(`❌ Lỗi WebSocket của sewingName ${sewingName}:`, err);
    });
  }

  removeClient(sewingName) {
    if (this.clients.has(sewingName)) {
      this.clients.delete(sewingName);
      console.log(`❌ sewingName: ${sewingName} đã ngắt kết nối`);
    }
  }

  sendToClient(sewingName, message) {
    const ws = this.clients.get(sewingName);

    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify(message));
        return true;
      } catch (err) {
        console.error(`❌ Lỗi khi gửi WebSocket đến ${sewingName}:`, err);
      }
    } else {
      console.warn(`⚠️ Không tìm thấy WebSocket của ${sewingName} hoặc kết nối đã đóng.`);
    }
    return false;
  }

  broadcast(message) {
    this.clients.forEach((ws, sewingName) => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify(message));
          console.log(`📢 Gửi broadcast đến ${sewingName}`);
        } catch (err) {
          console.error(`❌ Lỗi broadcast đến ${sewingName}:`, err);
        }
      }
    });
  }
}

module.exports = new ClientManager();
