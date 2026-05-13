import React, { useEffect, useRef } from 'react';

const ChatBox = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 h-[400px] max-h-[400px] overflow-y-auto p-4 mb-5 rounded-xl bg-gray-50/70 scroll-smooth">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`max-w-[80%] mb-4 p-3 rounded-2xl relative animate-in slide-in-from-bottom-2 duration-300 text-sm leading-relaxed ${
            msg.sender === 'bot' 
              ? 'bg-primary-light text-white rounded-bl-sm self-start shadow-sm' 
              : 'bg-primary text-white rounded-br-sm ml-auto shadow-sm'
          }`}
        >
          <p>{msg.text}</p>
          <span className="block text-[0.65rem] opacity-80 mt-1 text-right">
            {msg.time}
          </span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
