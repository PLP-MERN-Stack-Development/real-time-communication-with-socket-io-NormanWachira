import { useState } from 'react';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  const [username, setUsername] = useState(null);

  return (
    <div>
      {username ? (
        <Chat username={username} />
      ) : (
        <Login onLogin={setUsername} />
      )}
    </div>
  );
}

export default App;
