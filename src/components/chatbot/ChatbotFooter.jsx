import React from "react";

const ChatbotFooter = ({
  input,
  setInput,
  handleSend,
  handleVoiceInput,
  handleImageInput,
  t,
  lang
}) => (
  <form
    className="chatbot-input-area"
    onSubmit={e => {
      e.preventDefault();
      handleSend(input);
    }}
  >
    <label htmlFor="chatbot-image-upload" className="chatbot-image-label" title={t[lang].chatbot.image || "Image"}>
      <i className="bi bi-image chatbot-image-icon" />
      <input
        id="chatbot-image-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageInput}
      />
    </label>
    <input
      className="chatbot-input"
      value={input}
      onChange={e => setInput(e.target.value)}
      placeholder={t[lang].chatbot.input_placeholder}
      autoComplete="off"
      spellCheck={true}
    />
    <button className="btn chatbot-send-btn" type="submit">
      <i className="bi bi-send-fill" />
    </button>
    <button
      type="button"
      className="chatbot-voice-btn"
      title={t[lang].chatbot.voice || "Voice"}
      onClick={handleVoiceInput}
    >
      <i className="bi bi-mic-fill" />
    </button>
  </form>
);

export default ChatbotFooter;
