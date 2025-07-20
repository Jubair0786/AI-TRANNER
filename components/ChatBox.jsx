// Updated ChatBox.jsx with:
// - Input field send icon instead of Send button
// - Header buttons: New Chat, Theme Toggle (Sun/Moon), Chat History
// - Responsive mobile-friendly sticky menu

"use client";

import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Send, Mic, MicOff, ClipboardCheck, Clipboard } from "lucide-react";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem("chatHistory") || "[]"));
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [theme, setTheme] = useState("light");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);
    recognition.start();
  };

  const speakResponse = (text) => {
    if (!voiceEnabled) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    synth.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const aiMsg = { type: "bot", text: data.response || data.error };
    setMessages((prev) => [...prev, aiMsg]);
    speakResponse(aiMsg.text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const newChat = () => {
    setMessages([]);
    setInput("");
    localStorage.removeItem("chatHistory");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleEdit = (text) => {
    setInput(text);
  };

  return (
    <div className={`flex flex-col h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white sticky top-0 z-10">
        <h2 className="text-lg font-bold">🤖 AI ChatBot</h2>
        <div className="hidden sm:flex items-center gap-2">
          <button onClick={newChat} className="text-sm bg-white/20 px-3 py-1 rounded">+ New Chat</button>
          <button onClick={toggleTheme}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
          <div className="relative group">
            <button className="text-sm bg-white/20 px-3 py-1 rounded">Chat History</button>
            <div className="absolute hidden group-hover:block top-full mt-2 left-0 bg-white text-black p-2 rounded shadow-lg w-48 z-50">
              {messages.length > 0 ? (
                <div className="text-sm">Last Chat ({messages.length} msgs)</div>
              ) : (
                <div className="text-sm text-gray-500">No history</div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex sm:hidden flex-col items-start bg-white text-black px-4 py-2 gap-2 border-b dark:bg-gray-800 dark:text-white">
          <button onClick={newChat}>+ New Chat</button>
          <button onClick={toggleTheme}>{theme === "dark" ? "🌞 Light" : "🌙 Dark"}</button>
          <div>
            <div className="text-sm font-semibold">Chat History</div>
            {messages.length > 0 ? (
              <div className="text-sm">Last Chat ({messages.length} msgs)</div>
            ) : (
              <div className="text-sm text-gray-500">No history</div>
            )}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 rounded-lg max-w-[80%] text-sm relative break-words
              ${msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
            >
              <div>{msg.text}</div>
              <div className="flex gap-3 mt-1 text-xs">
                {msg.type === "user" && (
                  <button onClick={() => handleEdit(msg.text)} className="text-gray-200 hover:underline">✏️ Edit</button>
                )}
                {msg.type === "bot" && (
                  <button onClick={() => handleCopy(msg.text, i)} className="text-gray-600 hover:underline">
                    {copiedIndex === i ? <><ClipboardCheck size={14}/> Copied</> : <><Clipboard size={14}/> Copy</>}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-none bg-white dark:bg-gray-800 p-2 shadow-inner border-t sticky bottom-0">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type or speak..."
            className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <button onClick={startListening} title="Speak" className={`p-2 rounded-full ${listening ? "bg-red-200 animate-pulse" : "bg-gray-200"}`}>
            <Mic size={18} />
          </button>
          <button onClick={() => setVoiceEnabled(!voiceEnabled)} className={`p-2 rounded-full ${voiceEnabled ? "bg-green-200" : "bg-yellow-200"}`}>
            {voiceEnabled ? <Mic size={18} /> : <MicOff size={18} />}
          </button>
          <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
