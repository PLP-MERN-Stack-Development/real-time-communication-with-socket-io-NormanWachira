import Message from './Message';
import { useSocketContext } from '../context/SocketContext';

const ChatMessages = () => {
  const { messages, typingUsers } = useSocketContext();

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '0.5rem', border: '1px solid gray' }}>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      {typingUsers.length > 0 && <p><i>{typingUsers.join(', ')} is typing...</i></p>}
    </div>
  );
};

export default ChatMessages;
