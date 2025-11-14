import MessageReactions from './MessageReactions';

const Message = ({ message }) => {
  if (message.system) {
    return <p style={{ color: 'gray', fontStyle: 'italic' }}>{message.message}</p>;
  }

  return (
    <div style={{ marginBottom: '0.5rem', padding: '0.25rem', borderRadius: '4px', backgroundColor: message.isPrivate ? '#f0e68c' : '#e0e0e0' }}>
      <b>{message.sender}</b>: {message.message}
      <small style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>{new Date(message.timestamp).toLocaleTimeString()}</small>
      {message.reactions && message.reactions.length > 0 && (
        <span style={{ marginLeft: '0.5rem' }}>
          {message.reactions.map((r, i) => (
            <span key={i} style={{ marginRight: '0.25rem' }}>{r}</span>
          ))}
        </span>
      )}
      <MessageReactions message={message} />
    </div>
  );
};

export default Message;
