const { Server } = require('socket.io');

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
    /* options */
  });

  io.on('connection', (socket) => {
    console.log('A socket client connected');
  });
};
