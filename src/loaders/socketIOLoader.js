const { Server } = require('socket.io');

let onlineUsers = [];

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
    /* options */
  });

  io.on('connection', (socket) => {
    console.log('A main socket client connected', socket.id);

    setInterval(() => {
      socket.emit('test', Math.random());
    }, 5000);
  });

  io.of('/online-users').on('connection', (socket) => {
    socket.on('online', (user) => {
      onlineUsers.push({ user, socketId: socket.id });
      socket.broadcast.emit('new', user);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected!');
      const user = onlineUsers.find(({ socketId }) => socketId === socket.id)?.user;

      socket.broadcast.emit('remove', user);
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    });

    socket.on('get-list', () => {
      socket.emit(
        'list',
        onlineUsers.filter(({ socketId }) => socketId !== socket.id).map(({ user }) => user)
      );
    });
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
