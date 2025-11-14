import { useState, useEffect } from 'react';
import { useSocketContext, SocketProvider } from '../context/SocketContext';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import UserList from '../components/UserList';
import MessageSearch from '../components/MessageSearch';
import { useNotificationSound } from '../hooks/useNotificationSound';
import { useBrowserNotification } from '../hooks/useBrowserNotification';

const Chat = ({ username }) => {
  const [room, setRoom] = useState('General');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const {
    socket,
    messages,
    unreadCount,
    markAsRead,
  } = useSocketContext();

  // Join room and reset unread messages
  useEffect(() => {
    if (socket.connected) {
      socket.emit('join_room', room);
      markAsRead(); // reset unread count when switching rooms
    }
  }, [room, socket]);

  // Update filtered messages whenever messages change
  useEffect(() => {
    setFilteredMessages(messages);
  }, [messages]);

  // Notifications
  useNotificationSound(messages);
  useBrowserNotification(messages, username);

  return (
    <SocketProvider>
      <div
        className="chat-container"
        style={{ display: 'flex', padding: '1rem' }}
      >
        {/* User list / sidebar */}
        <div
          className="userlist"
          style={{
            width: '20%',
            borderRight: '1px solid gray',
            paddingRight: '1rem',
          }}
        >
          <UserList selectRoom={setRoom} />
        </div>

        {/* Chat area */}
        <div
          className="chat-area"
          style={{ flex: 1, paddingLeft: '1rem' }}
        >
          {/* Room header with unread count */}
          <h3>
            Room: {room} {unreadCount > 0 && `(${unreadCount} new)`}
          </h3>

          {/* Message search input */}
          <MessageSearch setFilteredMessages={setFilteredMessages} />

          {/* Chat messages */}
          <ChatMessages messages={filteredMessages} />

          {/* Chat input */}
          <ChatInput />
        </div>
      </div>
    </SocketProvider>
  );
};

export default Chat;
