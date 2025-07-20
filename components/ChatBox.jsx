"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, User } from "lucide-react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // ✅ Load chat history from localStorage in browser only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatHistory");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    }
  }, []);

  // ✅ Scroll and save chat history on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input.trim(), sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });

      const data = await res.json();

      const botMessage = {
        text: data?.response?.trim() || "Sorry, I didn't understand that.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "An error occurred. Please try again.", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="h-[500px] overflow-y-auto mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start mb-4 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && <Bot className="w-5 h-5 mr-2 mt-1" />}
            <div
              className={`rounded-lg px-4 py-2 ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && <User className="w-5 h-5 ml-2 mt-1" />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
