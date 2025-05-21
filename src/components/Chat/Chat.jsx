import Markdown from "react-markdown";
import "./Chat.css";
import { useEffect, useMemo, useRef } from "react";

const WELCOME_MESSAGE_GROUP = [
  {
    id: "welcum1",
    role: "assistant",
    content: "Hello!!! How can i assist you right now?",
  },
];

const Chat = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const messageGroups = useMemo(
    () =>
      messages.reduce((groups, message) => {
        if (message.role === "user") {
          groups.push([]); // for each user-assitant message combo: create a group array.
        }
        groups[groups.length - 1].push(message); // push thee messages into them

        return groups;
      }, []),
    [messages]
  );

  useEffect(() => {
    // use this only if you want to see user's question visible after system response

    // const lastMessage = messages[messages.length - 1];
    // if (lastMessage.role === "user") {
    //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="Chat">
      {[WELCOME_MESSAGE_GROUP, ...messageGroups].map((group, index) => (
        // group (user, assistant combination)
        <div key={index} className="Group">
          {group.map(({ id, role, content }) => (
            // message
            <div key={id} data-role={role} className="Message">
              <Markdown>{content}</Markdown>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
