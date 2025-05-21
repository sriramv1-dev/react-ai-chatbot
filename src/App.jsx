import { useState } from "react";
import "./App.css";
import chatbot from "./assets/chatbot.png";
import Chat from "./components/chat/chat";
import Controls from "./components/Controls/Controls";
import { v4 as uuidv4 } from "uuid";
import { GoogleAssitant as assistant } from "./assistants/googleai";
// import { DeepseekAssistant as assistant } from "./assistants/deepseekai";
// import { OpenAIAssistant as assistant } from "./assistants/openai";
import Loader from "./components/Loader/loader";

function App() {
  const g1 = new assistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleContentSend = async (content) => {
    addMessage({ id: uuidv4(), role: "user", content });
    setIsLoading(true);
    try {
      const response = await g1.chat(content);
      addMessage({
        id: uuidv4(),
        role: "assistant",
        content: response,
      });
    } catch (error) {
      addMessage({
        id: uuidv4(),
        role: "system",
        content: "sorry couldn't process your request, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateLastMessageContent = (content) => {
    setMessages((prevMessages) =>
      prevMessages.map((message, index) =>
        // appending this content to the last message.
        index === prevMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  };

  const handleContentStreamSend = async (content) => {
    addMessage({ id: uuidv4(), role: "user", content });
    setIsLoading(true);
    try {
      const result = await g1.chatStream(content, messages);
      let isFirstChunk = false;

      for await (const chunk of result) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ id: uuidv4(), role: "assistant", content: "" });
          setIsLoading(false);
          setIsStreaming(true);
        }

        updateLastMessageContent(chunk);
      }
      setIsStreaming(false);
    } catch (error) {
      console.log(error);
      addMessage({
        id: uuidv4(),
        role: "system",
        content: "sorry couldn't process your request, please try again.????",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <div className="App">
      {isLoading && <Loader />}
      <header className="Header">
        <img className="Logo" src={chatbot} />
        <h2 className="Title">AI Chatbot</h2>
      </header>
      <div className="ChatContainer">
        <Chat messages={messages} />
      </div>
      <Controls
        onSend={handleContentStreamSend}
        disabled={isLoading || isStreaming}
      />
    </div>
  );
}

export default App;
