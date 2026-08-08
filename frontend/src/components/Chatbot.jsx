import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  FaRobot,
  FaUser,
  FaPlus,
  FaHistory,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";

const CHAT_STORAGE_KEY = "psia-chatbot-chats";
const ACTIVE_CHAT_STORAGE_KEY = "psia-chatbot-active-chat";

const initialChats = [
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
];

function generateConversationTitle(message) {
  const cleaned = String(message || "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "New Conversation";
  }

  const words = cleaned.split(" ");
  const title = words.slice(0, 5).join(" ");

  if (title.length > 34) {
    return `${title.slice(0, 34).trim()}...`;
  }

  return title;
}

function readStoredChats() {
  if (typeof window === "undefined") {
    return initialChats;
  }

  try {
    const storedChats = window.localStorage.getItem(CHAT_STORAGE_KEY);
    const parsedChats = storedChats ? JSON.parse(storedChats) : null;

    return Array.isArray(parsedChats) && parsedChats.length > 0 ? parsedChats : initialChats;
  } catch {
    return initialChats;
  }
}

function readStoredActiveChat() {
  if (typeof window === "undefined") {
    return 0;
  }

  const storedIndex = Number(window.localStorage.getItem(ACTIVE_CHAT_STORAGE_KEY));
  return Number.isInteger(storedIndex) && storedIndex >= 0 ? storedIndex : 0;
}

function Chatbot() {
  const requestInFlightRef = useRef(false);
  const autoStartHandledRef = useRef(false);
  const [chats, setChats] = useState(() => readStoredChats());
  const [activeChat, setActiveChat] = useState(() => readStoredActiveChat());

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
    window.localStorage.setItem(ACTIVE_CHAT_STORAGE_KEY, String(activeChat));
  }, [chats, activeChat]);

  // Send Message

  const sendMessage = async () => {
    if (!input.trim() || requestInFlightRef.current) return;

    const userMessage = input.trim();
    requestInFlightRef.current = true;

    setChats((prevChats) =>
      prevChats.map((chat, index) => {
        if (index !== activeChat) {
          return chat;
        }

        const hasExistingUserMessages = chat.messages.some((message) => message.sender === "user");

        return {
          ...chat,
          title: hasExistingUserMessages ? chat.title : generateConversationTitle(userMessage),
          messages: [...chat.messages, { sender: "user", text: userMessage }],
        };
      })
    );

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to get a response.");
      }

      const aiReply = data.reply || "I’m sorry, I couldn’t generate a response.";

      setChats((prevChats) =>
        prevChats.map((chat, index) =>
          index === activeChat
            ? {
                ...chat,
                messages: [...chat.messages, { sender: "ai", text: aiReply }],
              }
            : chat
        )
      );
    } catch (error) {
      setChats((prevChats) =>
        prevChats.map((chat, index) =>
          index === activeChat
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    sender: "ai",
                    text: error.message || "Something went wrong. Please try again.",
                  },
                ],
              }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
      requestInFlightRef.current = false;
    }
  };

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

  const deleteChat = (index) => {
    const updatedChats = chats.filter((_, chatIndex) => chatIndex !== index);

    setChats(updatedChats);

    if (activeChat === index) {
      setActiveChat(0);
    } else if (activeChat > index) {
      setActiveChat((current) => Math.max(current - 1, 0));
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    // auto-start chat when navigated with state or query param
    const params = new URLSearchParams(window.location.search);
    const auto = location.state?.autoStart || params.get("autoStart") === "true";

    if (auto && !autoStartHandledRef.current) {
      autoStartHandledRef.current = true;
      createNewChat();
    }

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

      <main
        className="
      flex-1
      flex
      flex-col
      "
      >

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

                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xl px-5 py-4 rounded-2xl shadow bg-white text-gray-800">
                <div className="flex gap-3 items-start">
                  <FaRobot className="mt-1" />
                  <p>Thinking...</p>
                </div>
              </div>
            </div>
          )}
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
            disabled={isLoading}
            className="
          bg-blue-900
          text-white
          px-7
          rounded-xl
          flex
          items-center
          gap-2
          disabled:opacity-60
          "
          >
            <FaPaperPlane />
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Chatbot;
