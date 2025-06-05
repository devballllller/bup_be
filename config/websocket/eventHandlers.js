//eventHandlers
const ClientManager = require('./clientManager');

const eventHandlers = {
  // 🔔 Thông báo (dành cho HR, hệ thống gửi thông báo)
  notification: (ws, data) => {
    ClientManager.sendToClient(data.userId, {
      type: 'notification',
      message: data.message,
    });
  },

  // 💬 Tin nhắn chat
  chat_message: (ws, data) => {
    ClientManager.sendToClient(data.receiverId, {
      type: 'chat_message',
      senderId: data.senderId,
      message: data.message,
    });
  },

  // 📦 Cập nhật sản phẩm
  product_update: (ws, data) => {
    ClientManager.broadcast({
      type: 'product_update',
      productId: data.productId,
      status: data.status,
    });
  },
};

module.exports = eventHandlers;
