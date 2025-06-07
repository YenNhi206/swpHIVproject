// src/components/ChatWidget.jsx
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "doctor", text: "Chào bạn, tôi có thể giúp gì?" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "patient", text: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "doctor",
          text: "Cảm ơn bạn, tôi sẽ kiểm tra và tư vấn ngay.",
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Nút mở chat */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Khung chat */}
      {open && (
        <div className="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-red-600 text-white p-3">
            <span className="font-semibold">Tư vấn trực tuyến</span>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Nội dung chat */}
          <div
            ref={chatRef}
            className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-white to-gray-50"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${
                  msg.from === "patient" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-2xl shadow ${
                    msg.from === "patient"
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 rounded-2xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Nhập nội dung..."
            />
            <button
              onClick={handleSend}
              className="bg-red-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700 transition-all shadow"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
