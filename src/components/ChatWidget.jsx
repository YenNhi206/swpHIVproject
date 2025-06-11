import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import doctorImage from "../assets/doctor.png";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "doctor",
      text: "Chào bạn, tôi có thể giúp gì?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const [typing, setTyping] = useState(false);

  // Chọn animation kiểu nào
  const animationClass = "animate-scale-fade-in";

  const doctorReplies = [
    "Cảm ơn bạn, tôi sẽ kiểm tra và tư vấn ngay.",
    "Bạn có thể cung cấp thêm thông tin?",
    "Bạn vui lòng đợi trong giây lát.",
    "Tôi đã ghi nhận, sẽ phản hồi sớm.",
    "Bạn có câu hỏi nào khác không?",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { from: "patient", text: input, time: new Date() },
    ];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const randomReply =
        doctorReplies[Math.floor(Math.random() * doctorReplies.length)];
      setMessages((prev) => [
        ...prev,
        {
          from: "doctor",
          text: randomReply,
          time: new Date(),
        },
      ]);
      setTyping(false);
    }, 1500);
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
  }, [messages, typing]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Nút mở chat */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all animate-bounce"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Khung chat */}
      {open && (
        <div
          className={`w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-300 ${animationClass}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-red-600 text-white p-3">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="font-semibold">Tư vấn trực tuyến</span>
              <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            </div>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Nội dung chat */}
          <div
            ref={chatRef}
            className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-white to-gray-50 space-y-3"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-2 ${
                  msg.from === "patient" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar */}
                {msg.from === "doctor" && (
                  <img
                    src={doctorImage}
                    alt="Doctor"
                    className="w-8 h-8 rounded-full"
                  />
                )}

                <div
                  className={`max-w-[70%] px-4 py-2 rounded-3xl shadow ${
                    msg.from === "patient"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {msg.time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Avatar Patient */}
                {msg.from === "patient" && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                    alt="You"
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
            ))}

            {/* Typing... */}
            {typing && (
              <div className="flex items-end gap-2 justify-start">
                <img
                  src={doctorImage}
                  alt="Doctor"
                  className="w-8 h-8 rounded-full"
                />
                <div className="px-4 py-2 rounded-3xl bg-gray-200 text-gray-800 shadow text-sm animate-pulse">
                  Đang nhập...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 rounded-3xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Nhập nội dung..."
            />
            <button
              onClick={handleSend}
              className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-all shadow flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
