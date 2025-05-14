import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useRef } from 'react';
import './DocTalk.css';

const DocTalk = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const botSound = new Audio('/bot-reply.mp3');
  const messagesEndRef = useRef(null); // for auto-scroll

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ from: 'bot', text: "Hi, I'm Sylvie, your personal assistant. How can I help you today?" }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // auto-scroll on new message
  }, [messages]);

  const playSound = () => {
    botSound.play();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: updatedMessages }),
      });

      const data = await res.json();
      const botMessage = { from: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
      playSound();
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Server error. Please try again later.' },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span><b>🩺 DocTalk - (AI Assistant)</b></span>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${msg.from}`}
                style={{
                  animation: msg.from === 'bot' ? 'fadeIn 0.4s ease-out' : 'none',
                }}
              >
                {msg.from === 'bot' ? (
                  <div className="bot-message"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                ) : (
                  <div className="user-message">{msg.text}</div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your health query..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
<button className="chatbot-icon" onClick={() => setIsOpen(true)}>
  <img src="/images/chat-icon.png" alt="Chatbot" className="chatbot-image-icon" />
</button>
      )}
    </div>
  );
};

export default DocTalk;
