import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaRobot,
  FaUser,
  FaPlus,
  FaHistory,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";

function Chatbot() {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "Scholarship Schemes",
      messages: [
        {
          sender: "ai",
          text: "Hello 👋 I am your Government AI Assistant. How can I help you today?",
        },
      ],
    },

    {
      id: 2,
      title: "PM Kisan Eligibility",
      messages: [],
    },

    {
      id: 3,
      title: "Housing Schemes",
      messages: [],
    },
  ]);

  const [activeChat, setActiveChat] = useState(0);

  const [input, setInput] = useState("");

  // Send Message

  const sendMessage = () => {
    if (!input.trim()) return;

    const updatedChats = [...chats];

    updatedChats[activeChat].messages.push(
      {
        sender: "user",
        text: input,
      },

      {
        sender: "ai",
        text: "I will analyze your request and provide suitable government scheme information.",
      },
    );

    setChats(updatedChats);

    setInput("");
  };

  // Create New Chat

  const location = useLocation();

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),

      title: "New Conversation",

      messages: [
        {
          sender: "ai",
          text: "Hello 👋 How can I help you with government services?",
        },
      ],
    };

    setChats((prev) => {
      const updated = [...prev, newChat];
      setActiveChat(updated.length - 1);
      return updated;
    });
  };

  // Delete Chat

  const deleteChat = (index) => {
    const updatedChats = chats.filter((_, chatIndex) => chatIndex !== index);

    setChats(updatedChats);

    if (activeChat === index) {
      setActiveChat(0);
    }
  };

  useEffect(() => {
    // auto-start chat when navigated with state or query param
    const params = new URLSearchParams(window.location.search);
    const auto = location.state?.autoStart || params.get("autoStart") === "true";

    if (auto) {
      createNewChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="
    h-[calc(100vh-80px)]
    flex
    bg-gray-100
    "
    >
      {/* SIDEBAR */}

      <aside
        className="
      w-80
      bg-white
      border-r
      flex
      flex-col
      "
      >
        {/* Logo */}

        <div
          className="
        p-6
        border-b
        "
        >
          <h1
            className="
          text-xl
          font-bold
          text-blue-950
          "
          >
            Public Service AI
          </h1>

          <p
            className="
          text-sm
          text-gray-500
          mt-1
          "
          >
            Information Assistant
          </p>
        </div>

        {/* Chat History */}

        <div
          className="
        flex-1
        p-5
        overflow-y-auto
        "
        >
          <div
            className="
          flex
          justify-between
          items-center
          mb-5
          "
          >
            <h2
              className="
            font-bold
            text-gray-700
            "
            >
              Chat History
            </h2>

            <button
              onClick={createNewChat}
              className="
            text-blue-900
            hover:scale-110
            transition
            "
            >
              <FaPlus />
            </button>
          </div>

          {chats.length === 0 ? (
            <p
              className="
              text-gray-400
              text-sm
              text-center
              mt-10
              "
            >
              No chat history
            </p>
          ) : (
            chats.map((chat, index) => (
              <div
                key={chat.id}
                className={`
                flex
                items-center
                justify-between
                p-4
                rounded-xl
                mb-3
                transition

                ${
                  activeChat === index
                    ? "bg-blue-100 text-blue-900"
                    : "hover:bg-gray-100 text-gray-700"
                }

                `}
              >
                <div
                  onClick={() => setActiveChat(index)}
                  className="
                  flex
                  items-center
                  gap-3
                  flex-1
                  cursor-pointer
                  "
                >
                  <FaHistory />

                  <span
                    className="
                    text-sm
                    "
                  >
                    {chat.title}
                  </span>
                </div>

                <button
                  onClick={() => deleteChat(index)}
                  className="
                  text-red-500
                  hover:text-red-700
                  "
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* MAIN CHAT AREA */}

      <main
        className="
      flex-1
      flex
      flex-col
      "
      >
        {/* Header */}

        <div
          className="
        bg-white
        border-b
        px-8
        py-5
        flex
        items-center
        gap-4
        "
        >
          <div
            className="
          w-12
          h-12
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          text-blue-900
          text-xl
          "
          >
            <FaRobot />
          </div>

          <div>
            <h2
              className="
            text-2xl
            font-bold
            text-blue-950
            "
            >
              Government AI Assistant
            </h2>

            <p
              className="
            text-sm
            text-gray-500
            "
            >
              Your intelligent guide for government services
            </p>
          </div>
        </div>

        {/* Messages */}

        <div
          className="
        flex-1
        overflow-y-auto
        p-8
        space-y-5
        "
        >
          {chats[activeChat]?.messages.map((message, index) => (
            <div
              key={index}
              className={`
            flex

            ${message.sender === "user" ? "justify-end" : "justify-start"}

            `}
            >
              <div
                className={`
              max-w-xl
              px-5
              py-4
              rounded-2xl
              shadow

              ${
                message.sender === "user"
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-800"
              }

              `}
              >
                <div
                  className="
                flex
                gap-3
                items-start
                "
                >
                  {message.sender === "ai" ? (
                    <FaRobot className="mt-1" />
                  ) : (
                    <FaUser className="mt-1" />
                  )}

                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}

        <div
          className="
        bg-white
        border-t
        p-5
        flex
        gap-4
        "
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Ask about government schemes..."
            className="
          flex-1
          border
          rounded-xl
          px-5
          py-3
          outline-none
          focus:ring-2
          focus:ring-blue-900
          "
          />

          <button
            onClick={sendMessage}
            className="
          bg-blue-900
          text-white
          px-7
          rounded-xl
          flex
          items-center
          gap-2
          "
          >
            <FaPaperPlane />
            Send
          </button>
        </div>
      </main>
    </div>
  );
}

export default Chatbot;
