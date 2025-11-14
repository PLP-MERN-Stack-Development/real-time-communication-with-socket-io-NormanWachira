const Message = require('../models/messageModel');
const { limitMessages } = require('../utils/helpers');

const messages = [];
const users = {};
const typingUsers = {};

const chatController = (io, socket) => {

  // Handle user joining
  socket.on('user_join', (username) => {
    users[socket.id] = { username, id: socket.id, room: 'General' };
    socket.join('General');

    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id });
  });

  // Handle joining a specific room
  socket.on('join_room', (room) => {
    const previousRoom = users[socket.id]?.room;
    if (previousRoom) socket.leave(previousRoom);

    socket.join(room);
    users[socket.id].room = room;

    socket.emit('system_message', `Joined room: ${room}`);
  });

  // Handle global or room message
  socket.on('send_message', ({ message, room }) => {
    const user = users[socket.id] || { username: 'Anonymous' };
    const msg = new Message({ sender: user.username, senderId: socket.id, message, room });
    messages.push(msg);
    limitMessages(messages);

    io.to(room || user.room).emit('receive_message', msg);
  });

  // Private message
  socket.on('private_message', ({ to, message }) => {
    const user = users[socket.id] || { username: 'Anonymous' };
    const msg = new Message({ sender: user.username, senderId: socket.id, message, isPrivate: true });
    messages.push(msg);
    limitMessages(messages);

    socket.to(to).emit('private_message', msg);
    socket.emit('private_message', msg);
  });

  // Typing indicator
  socket.on('typing', (isTyping) => {
    if (!users[socket.id]) return;

    const username = users[socket.id].username;
    if (isTyping) typingUsers[socket.id] = username;
    else delete typingUsers[socket.id];

    io.emit('typing_users', Object.values(typingUsers));
  });

  // Read receipt
  socket.on('read_message', (messageId) => {
    const msg = messages.find((m) => m.id === messageId);
    if (msg && !msg.readBy.includes(socket.id)) {
      msg.readBy.push(socket.id);
      io.to(msg.room || socket.id).emit('update_read', msg);
    }
  });

  // React to a message
  socket.on('react_message', ({ messageId, reaction }) => {
    const msg = messages.find((m) => m.id === messageId);
    if (msg) {
      msg.reactions.push(reaction);
      io.to(msg.room || socket.id).emit('update_reaction', msg);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      io.emit('user_left', { username: user.username, id: socket.id });
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
    }
  });
};

module.exports = { chatController, messages, users };
