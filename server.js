const WebSocket = require('ws');

const server = new WebSocket.Server({
  port:8080,
  backlog: 2,
});

const ws = new WebSocket('ws://localhost:8080');

// const ws = new WebSocket.Server({
//   port: 8080,
// });


ws.on('open', function open() {
  console.log(`Соеденинение установлено на порт ${server.options.port}`);
})

server.on('connection', function connection(ws, req) {
  console.log(req.socket.remoteAddress);
  ws.on('message', function incoming(data) {
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        console.log(data)
      }
    });
  });
});