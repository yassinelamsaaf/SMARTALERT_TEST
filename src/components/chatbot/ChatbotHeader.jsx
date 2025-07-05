import React from "react";

const ChatbotHeader = ({ botName, onNewConversation, onClose, t, lang }) => (
  <div className="chatbot-header">
    <span className="chatbot-header-title">{botName}</span>
    <div className="chatbot-header-actions">
      <button
        className="chatbot-header-new"
        title={t[lang].chatbot.new_conversation || "Nouvelle conversation"}
        onClick={onNewConversation}
      >
        <span>+</span>
      </button>
      <button
        className="chatbot-header-close"
        title={t[lang].chatbot.close || "Fermer"}
        onClick={onClose}
      >
        ×
      </button>
    </div>
  </div>
);

export default ChatbotHeader;
