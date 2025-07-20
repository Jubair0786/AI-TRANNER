// app/chat/page.jsx

import ChatBox from "@/components/ChatBox";

export default function ChatPage() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat Assistant</h1>
      <ChatBox />
    </div>
  );
}
