import { useState } from 'react';
import { useSocketContext } from '../context/SocketContext';

const ChatInput = ({ recipient = null }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const { sendMessage, sendPrivateMessage, setTyping } = useSocketContext();

  const handleSend = () => {
    if (!message.trim() && !file) return;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        if (recipient) sendPrivateMessage(recipient, fileData);
        else sendMessage(fileData);
        setFile(null);
      };
      reader.readAsDataURL(file);
    } else {
      if (recipient) sendPrivateMessage(recipient, message.trim());
      else sendMessage(message.trim());
    }
    setMessage('');
    setTyping(false);
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    setTyping(e.target.value.length > 0);
  };

  return (
    <div style={{ display: 'flex', marginTop: '1rem' }}>
      <input
        type="text"
        value={message}
        onChange={handleTyping}
        placeholder="Type your message..."
        style={{ flex: 1, padding: '0.5rem' }}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginLeft: '0.5rem' }} />
      <button onClick={handleSend} style={{ marginLeft: '0.5rem' }}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
