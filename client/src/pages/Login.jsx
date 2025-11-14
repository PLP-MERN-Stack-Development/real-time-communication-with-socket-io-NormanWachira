import { useState } from 'react';
import { useSocket } from '../socket/socket';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const { connect } = useSocket();

  const handleLogin = () => {
    if (username.trim()) {
      connect(username.trim());
      onLogin(username.trim());
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Enter your username to join the chat</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Join Chat</button>
    </div>
  );
};

export default Login;
