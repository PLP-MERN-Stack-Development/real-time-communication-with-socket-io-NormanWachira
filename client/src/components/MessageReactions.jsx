import { useSocketContext } from '../context/SocketContext';

const reactionsList = ['👍', '❤️', '😂', '😮', '😢', '😡'];

const MessageReactions = ({ message }) => {
  const { socket } = useSocketContext();

  const react = (reaction) => {
    socket.emit('react_message', { messageId: message.id, reaction });
  };

  return (
    <div style={{ display: 'inline', marginLeft: '0.5rem' }}>
      {reactionsList.map((r, i) => (
        <button key={i} style={{ marginRight: '0.25rem' }} onClick={() => react(r)}>
          {r}
        </button>
      ))}
    </div>
  );
};

export default MessageReactions;
