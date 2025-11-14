import { useState } from 'react';
import { useSocketContext } from '../context/SocketContext';

const UserList = ({ selectRoom }) => {
  const { users } = useSocketContext();
  const [selectedUser, setSelectedUser] = useState(null);

  const handlePrivateMessage = (userId) => {
    setSelectedUser(userId);
  };

  return (
    <div>
      <h4>Online Users</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((u) => (
          <li key={u.id} style={{ marginBottom: '0.5rem' }}>
            {u.username}
            <button
              style={{ marginLeft: '0.5rem' }}
              onClick={() => handlePrivateMessage(u.id)}
            >
              PM
            </button>
          </li>
        ))}
      </ul>

      <h4>Chat Rooms</h4>
      <button onClick={() => selectRoom('General')}>General</button>
      <button onClick={() => selectRoom('Tech')}>Tech</button>
      <button onClick={() => selectRoom('Random')}>Random</button>
    </div>
  );
};

export default UserList;
