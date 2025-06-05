import React, { useState, useRef, useEffect } from "react";

export default function OnlineConsultation() {
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

    // Giả lập phản hồi bác sĩ
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

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">
        Tư vấn trực tuyến
      </h2>

      <div
        ref={chatRef}
        className="h-[400px] overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gradient-to-b from-white to-gray-50 mb-4"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 flex ${
              msg.from === "patient" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
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

      <div className="flex gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Nhập nội dung và nhấn Enter để gửi"
        />
        <button
          onClick={handleSend}
          className="bg-red-600 text-white px-6 py-2 rounded-2xl hover:bg-red-700 transition-all shadow-md"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
