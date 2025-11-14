import { useState } from 'react';
import { useSocketContext } from '../context/SocketContext';

const MessageSearch = ({ setFilteredMessages }) => {
  const { messages } = useSocketContext();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    const filtered = messages.filter((m) =>
      m.message.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search messages..."
      value={query}
      onChange={handleSearch}
      style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
    />
  );
};

export default MessageSearch;
