//websocketConfig
const WebSocket = require('ws');
const ClientManager = require('./clientManager');
const eventHandlers = require('./eventHandlers');

class WebSocketManager {
  setup(server) {
    this.wss = new WebSocket.Server({ server });

    this.wss.on('connection', (ws, req) => {
      const sewingName = new URL(req.url, `http://${req.headers.host}`).searchParams.get('sewingName');
      console.log('New connection established for sewingName:', sewingName);
      if (sewingName) {
        ClientManager.addClient(sewingName, ws);
        ws.on('message', (message) => {
          const data = JSON.parse(message);
          if (eventHandlers[data.type]) {
            eventHandlers[data.type](ws, data);
          }
        });

        ws.on('close', () => {
          ClientManager.removeClient(sewingName);
        });
      }
    });
  }
}

module.exports = new WebSocketManager();
