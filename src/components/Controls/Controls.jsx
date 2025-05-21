import { useEffect, useState, useRef } from "react";
import "./Controls.css";
import TextareaAutosize from "react-textarea-autosize";

const Controls = ({ onSend, disabled = false }) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleContentSend = () => {
    if (content.length > 0) {
      onSend(content);
      setContent("");
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleContentSend();
    }
  };

  useEffect(() => {
    if (!disabled) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  return (
    <div className="Controls">
      <div className="TextAreaContainer">
        <TextareaAutosize
          ref={textareaRef}
          className="TextArea"
          placeholder="Message AI Chatbot"
          onChange={handleContentChange}
          onKeyDown={handleEnterPress}
          value={content}
          minRows={1}
          maxRows={4}
          disabled={disabled}
        />
      </div>
      <button
        className="Button"
        disabled={disabled}
        onClick={handleContentSend}
      >
        <SendIcon />
      </button>
    </div>
  );
};

const SendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
};

export default Controls;
