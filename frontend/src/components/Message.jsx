function Message({ role, text }) {
  const isUser = role === "User";
  
  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-bubble">
        {text.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            <br/>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Message;