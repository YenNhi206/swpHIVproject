import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  const doctorReplies = [
    'Cảm ơn bạn, tôi sẽ kiểm tra và tư vấn ngay.',
    'Bạn có thể cung cấp thêm thông tin?',
    'Bạn vui lòng đợi trong giây lát.',
    'Tôi đã ghi nhận, sẽ phản hồi sớm.',
    'Bạn có câu hỏi nào khác không?',
  ];

  // Khởi tạo tin nhắn mặc định
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          from: 'doctor',
          text: 'Chào bạn, tôi có thể giúp gì?',
          time: new Date(),
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Scroll tự động xuống dưới cùng
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { from: 'patient', text: input, time: new Date() },
    ];
    setMessages(newMessages);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const randomReply = doctorReplies[Math.floor(Math.random() * doctorReplies.length)];
      setMessages((prev) => [
        ...prev,
        {
          from: 'doctor',
          text: randomReply,
          time: new Date(),
        },
      ]);
      setTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        from: 'doctor',
        text: 'Chào bạn, tôi có thể giúp gì?',
        time: new Date(),
      },
    ]);
    setInput('');
    setTyping(false);
  };

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Nút mở chat */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all animate-pulse"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle size={28} />
        </motion.button>
      )}

      {/* Khung chat */}
      {open && (
        <motion.div
          className="w-80 sm:w-96 h-[28rem] sm:h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-red-600 text-white p-3">
            <div className="flex items-center gap-2">
              <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Doctor" className="w-8 h-8 rounded-full" />
              <span className="font-semibold">Tư vấn trực tuyến</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleResetChat}
                className="p-1 hover:bg-red-700 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <RefreshCw size={18} />
              </motion.button>
              <motion.button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-red-700 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <X size={18} />
              </motion.button>
            </div>
          </div>

          {/* Nội dung chat */}
          <div
            ref={chatRef}
            className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50 space-y-3"
          >
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="flex items-end gap-2 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="max-w-[70%] px-4 py-2 rounded-3xl bg-gray-200">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/4 mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex items-end gap-2 ${
                      msg.from === 'patient' ? 'justify-end' : 'justify-start'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.from === 'doctor' && (
                      <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Doctor" className="w-8 h-8 rounded-full" />
                    )}
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-3xl shadow-sm ${
                        msg.from === 'patient'
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs text-gray-400 mt-1 text-right">
                        {msg.time.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    {msg.from === 'patient' && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                        alt="You"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
                {typing && (
                  <div className="flex items-end gap-2 justify-start animate-pulse">
                    <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Doctor" className="w-8 h-8 rounded-full" />
                    <div className="max-w-[70%] px-4 py-2 rounded-3xl bg-gray-100 text-gray-800 shadow-sm text-sm">
                      Đang nhập...
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex gap-2 bg-white">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 border border-gray-300 rounded-3xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 max-h-24"
              placeholder="Nhập nội dung..."
            />
            <motion.button
              onClick={handleSend}
              className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors duration-300 shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Send size={18} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}