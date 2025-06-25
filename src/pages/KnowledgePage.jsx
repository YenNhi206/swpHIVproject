import React, { useState } from "react";
import { motion } from "framer-motion";
import blogImg from "../assets/blog.jpg";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Syringe, Target, ChevronDown, FileText, X, ChevronRight } from 'lucide-react';
import Button from '../components/Button';

const documents = [
  {
    title: "Hướng dẫn điều trị HIV cho người mới phát hiện",
    description:
      "Tài liệu cơ bản giúp bạn hiểu về các bước điều trị ban đầu, xét nghiệm cần thiết và tư vấn tâm lý.",
    link: "https://www.prepwatch.org/wp-content/uploads/2019/05/Care_and_Treatment_Guidelines_Vietnam_2017.pdf",
  },
  {
    title: "Tài liệu giáo dục phòng ngừa HIV",
    description:
      "Thông tin giúp bạn hiểu cách phòng tránh lây nhiễm HIV trong cộng đồng và trong gia đình.",
    link: "https://asttmoh.vn/wp-content/uploads/2015/05/Tai-lieu-dao-tao-HIV.AIDS-Trung-cap-Y.pdf",
  },
];

const blogPosts = [
  {
    title: "Người sẻ chia khủng hoảng, buồn vui cùng bệnh nhân HIV",
    description:
      "SKĐS - Người nhiễm HIV thường nghĩ rằng, họ sẽ nhận được sự kỳ thị, xa lánh... thay vì thương cảm, sẻ chia từ cộng đồng.",
    link: "https://bvquan5.medinet.gov.vn/chuyen-muc/nguoi-se-chia-khung-hoang-buon-vui-cung-benh-nhan-hiv-c16896-131217.aspx",
  },
  {
    title: "8 cách để hỗ trợ điều trị HIV hiệu quả và tăng cường hệ miễn dịch",
    description:
      "Thuốc điều trị HIV là chìa khóa để bệnh nhân HIV khỏe mạnh khi sống chung với loại virus này.",
    link: "https://vaac.gov.vn/8-cach-de-ho-tro-dieu-tri-hiv-hieu-qua-va-tang-cuong-he-mien-dich.html",
  },
  {
    title: "Lời khuyên bổ ích cho người nhiễm HIV/AIDS",
    description:
      "Đối với những người nhiễm HIV/AIDS, cần thêm vitamin và khoáng chất để giúp sửa chữa và chữa lành các tế bào bị hư hỏng.",
    link: "https://moh.gov.vn/chuong-trinh-muc-tieu-quoc-gia/-/asset_publisher/7ng11fEWgASC/content/loi-khuyen-bo-ich-cho-nguoi-nhiem-hiv-aids",
  },
];

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

const treatmentGuides = [
  {
    title: "Phác đồ điều trị ARV cơ bản",
    content:
      "Thuốc ARV giúp ngăn chặn sự phát triển của virus HIV trong cơ thể. Việc tuân thủ phác đồ điều trị rất quan trọng để duy trì sức khỏe và giảm nguy cơ lây nhiễm.",
  },
  {
    title: "Lời khuyên về dinh dưỡng và sinh hoạt",
    content:
      "Bổ sung đầy đủ dinh dưỡng, tập thể dục đều đặn, tránh căng thẳng và giữ tinh thần lạc quan giúp tăng cường hệ miễn dịch.",
  },
];

export default function KnowledgePage() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.main
      className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.section
        className="text-center mb-16"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-extrabold text-red-700 mb-4 tracking-tight">
          Trang Kiến Thức HIV
        </h1>
        <p className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
          Thông tin chính xác, chuyên sâu và dễ tiếp cận về HIV, hỗ trợ người nhiễm, gia đình và cộng đồng để nâng cao nhận thức và giảm kỳ thị.
        </p>
      </motion.section>

      <motion.section
        className="mb-20"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center flex items-center justify-center gap-2">
          <Users className="w-6 h-6" /> Thống Kê Về HIV tại Việt Nam
        </h2>

        {/* Cards thống kê nhanh */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-10">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-md"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Users className="text-4xl text-red-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-red-700">230.000+</p>
            <p className="text-sm text-gray-700 mt-1">Người đang sống với HIV</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-md"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Syringe className="text-4xl text-red-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-red-700">80%</p>
            <p className="text-sm text-gray-700 mt-1">Tiếp cận điều trị ARV</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-md"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Target className="text-4xl text-red-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-red-700">95-95-95</p>
            <p className="text-sm text-gray-700 mt-1">Mục tiêu quốc gia đến 2030</p>
          </motion.div>
        </div>

        {/* Biểu đồ cải thiện nhờ ARV */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-md"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-center text-red-600 mb-4">Tỷ lệ điều trị ARV qua các năm</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { year: '2018', rate: 60 },
              { year: '2019', rate: 65 },
              { year: '2020', rate: 70 },
              { year: '2021', rate: 75 },
              { year: '2022', rate: 80 },
              { year: '2023', rate: 83 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="rate" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.section>

      {/* Kiến Thức Nền Tảng */}
      <motion.section
        className="mb-20"
        variants={containerVariants}
      >
        <h3 className="text-2xl font-bold text-red-600 mb-8 text-center flex items-center justify-center gap-2">
          <FileText className="w-6 h-6" /> Kiến thức nền tảng về HIV/AIDS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-3 hover:shadow-lg transition-all duration-200"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl"></span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Các giai đoạn của HIV/AIDS</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                HIV tiến triển qua 3 giai đoạn chính: <strong>Giai đoạn cấp tính</strong>, <strong>giai đoạn không triệu chứng</strong>, và <strong>AIDS</strong>. Nếu không điều trị, hệ miễn dịch sẽ suy yếu nghiêm trọng, dễ dẫn đến tử vong.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-3 hover:shadow-lg transition-all duration-200"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl"></span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">ARV là gì?</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                ARV (thuốc kháng virus) giúp <strong>kiểm soát virus HIV</strong>, ngăn không cho virus nhân lên. Dùng ARV sớm và đều đặn giúp sống khỏe mạnh và giảm nguy cơ lây nhiễm.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-3 hover:shadow-lg transition-all duration-200"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl"></span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Cơ chế hoạt động của ARV</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                ARV ức chế enzyme cần thiết để HIV sao chép. Tuân thủ điều trị giúp <strong>tải lượng virus xuống mức không phát hiện</strong>, người nhiễm có thể sống như người bình thường.
              </p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-3 hover:shadow-lg transition-all duration-200"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl"></span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">HIV khác gì với AIDS?</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>HIV</strong> là virus, còn <strong>AIDS</strong> là giai đoạn cuối của nhiễm HIV khi hệ miễn dịch bị phá hủy. Người có HIV không đồng nghĩa với việc đã mắc AIDS.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Hướng Dẫn Điều Trị */}
      <motion.section
        className="mb-16"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-8 text-center flex items-center justify-center gap-2">
          <Syringe className="w-6 h-6" /> Hướng Dẫn Điều Trị
        </h2>
        <p className="text-base text-gray-700 mb-8 max-w-2xl mx-auto text-center leading-relaxed">
          Phương pháp điều trị HIV tiên tiến và lời khuyên thiết thực để sống tích cực, khỏe mạnh.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {treatmentGuides.map(({ title, content }, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-3 hover:shadow-lg transition-all duration-200"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl"></span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Educational Library Section */}
      <motion.section
        className="mb-16"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-8 text-center flex items-center justify-center gap-2">
          <FileText className="w-6 h-6" /> Thư Viện Tài Liệu Giáo Dục
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedDoc(doc.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedDoc(doc.link);
              }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{doc.title}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{doc.description}</p>
              <Button
                label="Xem tài liệu"
                icon={<FileText className="w-4 h-4" />}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDoc(doc.link);
                }}
              />
            </motion.div>
          ))}
        </div>

        {selectedDoc && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <header className="flex justify-between items-center bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-4 rounded-t-2xl">
                <h3 className="text-lg font-semibold">Xem Tài Liệu</h3>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-1.5 hover:bg-red-900 rounded-full transition"
                  aria-label="Đóng"
                >
                  <X className="h-6 w-6" />
                </button>
              </header>
              <div className="flex-1 p-6 bg-gray-50 overflow-auto">
                <object
                  data={selectedDoc}
                  type="application/pdf"
                  className="w-full h-[65vh] rounded-lg bg-white shadow-inner"
                >
                  <p className="text-gray-700 p-4 text-sm">
                    Trình duyệt không hỗ trợ xem PDF.{" "}
                    <a
                      href={selectedDoc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-700 hover:text-red-800 underline font-medium"
                    >
                      Tải xuống tài liệu
                    </a>
                  </p>
                </object>
              </div>
              <footer className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white">
                <Button
                  label="Mở trong tab mới"
                  onClick={() => window.open(selectedDoc, "_blank")}
                  icon={<FileText className="w-4 h-4" />}
                />
                <Button
                  label="Đóng"
                  onClick={() => setSelectedDoc(null)}
                />
              </footer>
            </motion.div>
          </motion.div>
        )}
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="mb-16"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-8 text-center flex items-center justify-center gap-2">
          <Users className="w-6 h-6" /> Câu Hỏi Thường Gặp (FAQ)
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqItems.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
              variants={itemVariants}
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
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.detailedContent}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Blog Section */}
      <motion.section
        className="mb-16"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-8 text-center flex items-center justify-center gap-2">
          <FileText className="w-6 h-6" /> Blog Chia Sẻ Kinh Nghiệm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map(({ title, description, link }, idx) => (
            <motion.article
              key={title}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-200"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{description}</p>
              <Button
                label="Đọc thêm"
                onClick={() => window.open(link, "_blank")}
                icon={<ChevronRight className="w-4 h-4" />}
              />
            </motion.article>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}