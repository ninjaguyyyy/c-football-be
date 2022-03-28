const { Server } = require('socket.io');

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
    /* options */
  });

  io.on('connection', (socket) => {
    console.log('A main socket client connected');

    setInterval(() => {
      socket.emit('test', Math.random());
    }, 5000);
  });

  io.of('/chat').on('connection', (socket) => {
    console.log('A chat socket client connected');

    socket.on('join', ({ conversationId }) => {
      socket.join(conversationId);
    });

    socket.on('leave', ({ conversationId }) => {
      socket.leave(conversationId);
    });

    socket.on('send-message', ({ sender, conversationId, text }) => {
      socket.to(conversationId).emit('message', {
        sender,
        text,
      });
    });
  });
};
