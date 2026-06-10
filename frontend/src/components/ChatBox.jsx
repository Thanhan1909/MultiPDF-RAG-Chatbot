import { useState, useRef, useEffect } from "react";
import { askQuestion } from "../services/api";
import Message from "./Message";

function ChatBox({ onSourcesUpdate, lastUploadedFile }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { role: "Assistant", text: "Hello! I am ready to answer questions about the documents you've uploaded." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const send = async () => {
    if (!question.trim() || isLoading) return;

    const userMsg = { role: "User", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setIsLoading(true);
    onSourcesUpdate([]); // Clear sources while generating

    try {
      const res = await askQuestion(userMsg.text);
      setMessages((prev) => [
        ...prev,
        { role: "Assistant", text: res.answer }
      ]);
      onSourcesUpdate(res.sources);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "Assistant", text: "Sorry, I encountered an error. Is the server running?" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      <div className="messages-container">
        {lastUploadedFile && (
          <div style={{
            textAlign: "center",
            padding: "8px",
            margin: "10px auto",
            backgroundColor: "rgba(74, 222, 128, 0.1)",
            color: "#4ade80",
            borderRadius: "8px",
            fontSize: "0.85rem",
            width: "max-content",
            border: "1px solid rgba(74, 222, 128, 0.2)"
          }}>
            Đang trả lời dựa trên file: <strong>{lastUploadedFile}</strong>
          </div>
        )}
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} />
        ))}
        
        {isLoading && (
          <div className="message-wrapper assistant">
            <div className="message-bubble">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <div className="input-wrapper">
          <input
            className="chat-input"
            placeholder="Ask a question about the documents..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button 
            className="send-button" 
            onClick={send}
            disabled={isLoading || !question.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatBox;