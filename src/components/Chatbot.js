
import React, { useState } from "react";
import { Send, Bot, X, MessageSquare } from "lucide-react";
import "./Chatbot.css";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    const newChatHistory = [...chatHistory, { sender: "user", text: message }];
    setChatHistory(newChatHistory);

    try {
      const res = await fetch(" https://8614-2406-7400-bb-5498-d8c5-4408-baf5-4c6f.ngrok-free.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
      });

      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      const botResponse = data.reply || "🤖 AI did not respond.";
      setChatHistory([...newChatHistory, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory([
        ...newChatHistory,
        { sender: "bot", text: "⚠ Could not connect to AI chatbot." },
      ]);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot className="bot-icon" />
              <span>GUAVAI Assistant</span>
            </div>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
          </div>

          <div className="chatbot-messages">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
              >
                <div className="message-content">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="input-field"
              rows={2}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="send-button"
            >
              {loading ? (
                "Thinking..."
              ) : (
                <Send />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
