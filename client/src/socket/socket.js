// socket.js - Socket.io client setup
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentRoom, setCurrentRoom] = useState('General');
  const [username, setUsername] = useState(null);

  const connect = (user) => {
    setUsername(user);
    socket.connect();
    if (user) socket.emit('user_join', user);
  };

  const disconnect = () => socket.disconnect();
  const sendMessage = (msg) => socket.emit('send_message', { message: msg, room: currentRoom });
  const sendPrivateMessage = (to, msg) => socket.emit('private_message', { to, message: msg });
  const setTypingStatus = (isTyping) => socket.emit('typing', isTyping);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    const onReceiveMessage = (msg) => {
      setLastMessage(msg);
      setMessages((prev) => [...prev, msg]);
      if (msg.sender !== username && msg.room === currentRoom) setUnreadCount((c) => c + 1);
    };

    const onUserList = (userList) => setUsers(userList);
    const onUserJoined = (user) => setMessages((prev) => [...prev, { id: Date.now(), system: true, message: `${user.username} joined the chat`, timestamp: new Date().toISOString() }]);
    const onUserLeft = (user) => setMessages((prev) => [...prev, { id: Date.now(), system: true, message: `${user.username} left the chat`, timestamp: new Date().toISOString() }]);
    const onTypingUsers = (users) => setTypingUsers(users);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
    };
  }, [username, currentRoom]);

  const markAsRead = () => setUnreadCount(0);

  return {
    socket,
    isConnected,
    lastMessage,
    messages,
    users,
    typingUsers,
    unreadCount,
    currentRoom,
    setCurrentRoom,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping: setTypingStatus,
    markAsRead,
    setUsername,
  };
};

export default socket;
