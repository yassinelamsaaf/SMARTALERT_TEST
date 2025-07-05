import React, { useState, useEffect, useRef } from "react";
import ChatbotMain from "./ChatbotMain";

const ChatbotFloatingButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(true); // Show button by default
  const [chatHistory, setChatHistory] = useState(null); // null means let ChatbotMain use its default, otherwise pass
  const chatbotRef = useRef(null);

  const handleclick = () => {
    setShowModal(true);
    setShowButton(false); // Hide the button when modal is open
  };

  // Listen for close event from inside ChatbotMain
  useEffect(() => {
    const closeHandler = () => {
      setShowModal(false);
      setShowButton(true);
    };
    window.addEventListener("closeChatbotModal", closeHandler);
    return () => window.removeEventListener("closeChatbotModal", closeHandler);
  }, []);

  // Close modal if clicking outside the chatbot window
  useEffect(() => {
    if (!showModal) return;
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setShowModal(false);
        setShowButton(true); // Show the button again when modal is closed
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  // Handler to update chat history from ChatbotMain
  const handleHistoryChange = (history) => {
    setChatHistory(history);
  };

  return (
    <>
      {showButton && (
        <button
          className="chatbot-floating-btn"
          onClick={handleclick}
          aria-label="Open Chatbot"
        >
          <i
            className="bi bi-robot chatbot-icon"
          />
        </button>
      )}
      {showModal && (
        <div className="chatbot-modal-backdrop">
          <div className="chatbot-modal" ref={chatbotRef} tabIndex={-1}>
            <ChatbotMain
              initialMessages={chatHistory}
              onHistoryChange={handleHistoryChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotFloatingButton;
