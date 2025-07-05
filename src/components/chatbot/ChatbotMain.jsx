import React, { useState, useRef, useEffect, useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotFooter from "./ChatbotFooter";

const getInitialMessages = (lang) => [
  {
    from: "bot",
    text: t[lang].chatbot.welcome,
    quickActions: [
      { label: t[lang].chatbot.create_alert, value: "create_alert" },
      { label: t[lang].chatbot.post_annonce, value: "post_annonce" },
      { label: t[lang].chatbot.search_used, value: "search_used" },
      { label: t[lang].chatbot.search_new, value: "search_new" },
      { label: t[lang].chatbot.change_language, value: "change_language" },
      { label: t[lang].chatbot.show_guide, value: "show_guide" },
    ],
  },
];

const ChatbotMain = ({ initialMessages, onHistoryChange }) => {
  const { lang } = useContext(LanguageContext);
  const [messages, setMessages] = useState(() => initialMessages || getInitialMessages(lang));
  const [input, setInput] = useState("");
  const [showQuickActions, setShowQuickActions] = useState(
    initialMessages && initialMessages.length > 1 ? false : true
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (onHistoryChange) onHistoryChange(messages);
    // Show quick actions if only the welcome message is present
    if (messages.length === 1 && messages[0].from === "bot" && messages[0].quickActions) {
      setShowQuickActions(true);
    } else {
      setShowQuickActions(false);
    }
  }, [messages, onHistoryChange]);

  useEffect(() => {
    if (!initialMessages) {
      setMessages(getInitialMessages(lang));
      setShowQuickActions(true);
    }
    // else: don't reset if initialMessages is provided
  }, [lang, initialMessages]);

  const handleSend = (msg) => {
    if (!msg.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: msg },
      { from: "bot", text: "(Réponse du bot ici - connectez l'API)" },
    ]);
    setInput("");
    // setShowQuickActions(false); // Now handled in useEffect
  };

  const handleQuickAction = (value) => {
    handleSend(value);
    // setShowQuickActions(false); // Now handled in useEffect
  };

  const handleNewConversation = () => {
    setMessages(getInitialMessages(lang));
    setShowQuickActions(true);
    setInput("");
  };

  const handleVoiceInput = () => {
    // Placeholder for voice input logic
    alert("Voice input not implemented yet.");
  };

  const handleImageInput = (e) => {
    // Placeholder for image upload logic
    alert("Image upload not implemented yet.");
  };

  return (
    <div className="chatbot-main">
      <ChatbotHeader
        botName={t[lang].chatbot.bot_name}
        onNewConversation={handleNewConversation}
        onClose={() => window.dispatchEvent(new CustomEvent("closeChatbotModal"))}
        t={t}
        lang={lang}
      />
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatbot-message chatbot-message-${msg.from}`}> 
            <div className="chatbot-bubble">
              {msg.text}
            </div>
            {showQuickActions && msg.quickActions && idx === 0 && (
              <div className="chatbot-quick-actions">
                {msg.quickActions.map((qa, i) => (
                  <button
                    key={i}
                    className="btn chatbot-quick-action-btn"
                    onClick={() => handleQuickAction(qa.label)}
                  >
                    {qa.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatbotFooter
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleVoiceInput={handleVoiceInput}
        handleImageInput={handleImageInput}
        t={t}
        lang={lang}
      />
    </div>
  );
};

export default ChatbotMain;
