

import React, { useState, useEffect } from 'react';
import { LoaderCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

// Câu hỏi thường gặp (FAQ)
const faqItems = [
  {
    question: "HIV là gì và lây truyền qua những con đường nào?",
    shortAnswer:
      "HIV là virus gây suy giảm miễn dịch, lây qua máu, tình dục không an toàn và từ mẹ sang con.",
    detailedContent: (
      <>
        <p className="text-gray-700 mb-3">
          HIV (Human Immunodeficiency Virus) là virus làm suy yếu hệ thống miễn dịch của con người, khiến cơ thể dễ mắc các bệnh nhiễm trùng và ung thư.
        </p>
        <p className="text-gray-700 mb-3 font-semibold">Các con đường lây truyền chính:</p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>Quan hệ tình dục không an toàn (qua đường âm đạo, hậu môn, hoặc miệng nếu có vết thương)</li>
          <li>Dùng chung kim tiêm hoặc các dụng cụ tiêm chích</li>
          <li>Truyền máu hoặc chế phẩm máu nhiễm HIV (rất hiếm hiện nay do sàng lọc máu tốt)</li>
          <li>Truyền từ mẹ sang con trong thai kỳ, lúc sinh hoặc cho con bú</li>
        </ul>
      </>
    ),
  },
  {
    question: "Người nhiễm HIV có thể sống bình thường không?",
    shortAnswer:
      "Với điều trị ARV đúng cách, người nhiễm HIV có thể sống khỏe mạnh và gần như bình thường.",
    detailedContent: (
      <>
        <p className="text-gray-700 mb-3">
          Ngày nay, HIV không còn là án tử. Nhờ điều trị bằng thuốc kháng virus (ARV), người nhiễm HIV có thể sống lâu dài, khỏe mạnh, và hòa nhập cộng đồng.
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>Tuân thủ điều trị giúp giảm tải lượng virus xuống mức không thể phát hiện</li>
          <li>Người nhiễm HIV có thể làm việc, học tập, sinh hoạt, lập gia đình như người không nhiễm</li>
          <li>Phụ nữ nhiễm HIV vẫn có thể sinh con khỏe mạnh nếu điều trị đúng cách</li>
        </ul>
      </>
    ),
  },
  {
    question: "Làm thế nào để phòng tránh lây nhiễm HIV?",
    shortAnswer:
      "Sử dụng bao cao su, không dùng chung kim tiêm, xét nghiệm định kỳ và điều trị sớm nếu nhiễm.",
    detailedContent: (
      <>
        <p className="text-gray-700 mb-3">
          Phòng tránh HIV hiệu quả bằng cách thay đổi hành vi và duy trì các biện pháp an toàn:
        </p>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>Luôn dùng bao cao su đúng cách khi quan hệ tình dục</li>
          <li>Không dùng chung bơm kim tiêm hoặc dụng cụ có thể gây chảy máu</li>
          <li>Xét nghiệm HIV định kỳ, đặc biệt là nhóm nguy cơ</li>
          <li>Tham gia điều trị dự phòng trước phơi nhiễm (PrEP) nếu có nguy cơ cao</li>
          <li>Phụ nữ mang thai cần kiểm tra HIV sớm để can thiệp kịp thời</li>
        </ul>
      </>
    ),
  },
];

// Animation cho item
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function SectionTitle({ children }) {
  return (
    <h2 className="text-3xl font-extrabold text-red-700 mb-6 border-l-4 border-red-600 pl-4">
      {children}
    </h2>
  );
}

function Section({ title, blogs }) {
  return (
    <motion.section
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-md p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition-all flex flex-col h-full"
          >
            <div className="text-lg font-semibold text-black mb-2">
              {blog.title}
            </div>

            <p className="text-sm text-gray-600 mb-2">{blog.description}</p>
            <div className="text-sm text-gray-400 mb-3 mt-auto">
              <span>🖊 {blog.author}</span> •{" "}
              <span>🗓 {new Date(blog.createdAt).toLocaleDateString("vi-VN")}</span>
            </div>

            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Đọc thêm →
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default function KnowledgePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        <LoaderCircle className="animate-spin mr-2" /> Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="p-6 md:p-10 rounded-2xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 leading-tight mb-3">
          Kiến Thức Toàn Diện Về HIV/AIDS
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-medium mb-2">
          Cùng hiểu đúng để sống khỏe mạnh và đẩy lùi kỳ thị.
        </p>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-4 text-justify">
          HIV không còn là án tử như trước kia. Tuy nhiên, những hiểu lầm, sợ hãi và kỳ thị vẫn đang khiến nhiều người sống chung với HIV cảm thấy bị cô lập, thiếu sự cảm thông và hỗ trợ từ cộng đồng.
        </p>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-4 text-justify">
          Trang thông tin này là điểm khởi đầu cho hành trình thay đổi nhận thức. Tại đây, bạn sẽ tìm thấy những kiến thức đáng tin cậy về cách lây truyền, cách phòng tránh, và các phương pháp điều trị tiên tiến. Chúng tôi mong muốn cung cấp nền tảng hiểu biết vững chắc để bạn có thể bảo vệ bản thân và giúp đỡ người khác một cách nhân văn và đúng đắn.
        </p>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto text-justify">
          Bằng cách lan tỏa thông tin đúng và thái độ tích cực, chúng ta có thể cùng nhau xây dựng một cộng đồng không kỳ thị, nơi mọi người – dù có sống chung với HIV hay không – đều được tôn trọng, yêu thương và sống khỏe mạnh.
        </p>
      </div>


      <div className="flex items-center justify-center my-10">
        <div className="h-px bg-gray-300 flex-grow" />
        <div className="mx-4 text-gray-400">● ● ●</div>
        <div className="h-px bg-gray-300 flex-grow" />
      </div>

      {/* Kiến Thức Nền Tảng */}
      <Section title="Kiến thức nền tảng về HIV/AIDS" blogs={blogs.slice(0, 2)} />

      {/* FAQ */}
      <div className="mt-16 mb-20">
        <SectionTitle>Câu Hỏi Thường Gặp</SectionTitle>
        <div className="space-y-4 px-4">
          {faqItems.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 font-semibold hover:bg-red-50 transition-colors"
                aria-expanded={openFAQIndex === i}
              >
                <span className="text-base">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform duration-200 ${openFAQIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFAQIndex === i && (
                <motion.div
                  className="px-6 py-5 bg-red-50 text-gray-700 text-sm leading-relaxed"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.detailedContent}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hướng Dẫn Điều Trị */}
      <Section title="Hướng Dẫn Điều Trị" blogs={blogs.slice(2, 4)} />

      {/* Thư Viện Tài Liệu Giáo Dục */}
      <Section title="Thư Viện Tài Liệu Giáo Dục" blogs={blogs.slice(4, 6)} />

      {/* Blog Chia Sẻ Và Kinh Nghiệm */}
      <Section title="Blog Chia Sẻ Và Kinh Nghiệm" blogs={blogs.slice(6, 9)} />
    </div>
  );
}