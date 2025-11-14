const { chatController } = require('../controllers/chatController');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    chatController(io, socket);
  });
};

module.exports = socketHandler;
