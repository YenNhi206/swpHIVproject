import React, { useState } from "react";
import healthcareImage from "../assets/healthcare.jpg";
import { FloatButton } from "antd";
import {
  MessageOutlined,
  CalendarOutlined,
  FilePdfOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


export default function AboutPage() {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

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

  const faqs = [
    {
      question: "HIV lây truyền qua những con đường nào?",
      answer:
        "HIV lây truyền chủ yếu qua đường máu, quan hệ tình dục không an toàn, và mẹ sang con trong quá trình mang thai, sinh đẻ.",
    },
    {
      question: "Tôi có thể đăng ký khám ẩn danh không?",
      answer:
        "Có, hệ thống hỗ trợ đăng ký khám và tư vấn ẩn danh để bảo mật thông tin người dùng.",
    },
    {
      question: "Làm sao để nhận được nhắc nhở uống thuốc?",
      answer:
        "Sau khi đăng ký điều trị, bạn có thể bật chức năng nhắc nhở trong hồ sơ cá nhân để không bỏ liều thuốc.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md">
      <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
        <img
          src={healthcareImage}
          alt="Healthcare"
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <section className="mb-16">
        <h1 className="text-4xl font-extrabold text-red-700 mb-6 border-l-4 border-red-600 pl-4">
          Giới thiệu về hệ thống
        </h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-3 flex items-center gap-2">
              <span>🎯</span> Mục đích và sứ mệnh
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Hệ thống <strong>HIV Treatment and Medical Services System</strong> được phát triển nhằm tăng cường tiếp cận dịch vụ y tế và điều trị HIV cho bệnh nhân tại cơ sở y tế. Chúng tôi cam kết hỗ trợ người bệnh một cách toàn diện, minh bạch và bảo mật.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-3 flex items-center gap-2">
              <span>🛠️</span> Chức năng chính
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
              <li>Đăng ký lịch khám & điều trị, chỉ định bác sĩ điều trị</li>
              <li>Tra cứu kết quả xét nghiệm (CD4, tải lượng HIV, phác đồ ARV)</li>
              <li>Nhắc nhở lịch tái khám & uống thuốc theo phác đồ</li>
              <li>Đặt lịch hẹn trực tuyến, đăng ký ẩn danh</li>
              <li>Quản lý hồ sơ bác sĩ và bệnh nhân</li>
              <li>Dashboard & báo cáo phục vụ quản lý và điều trị</li>
              <li>Chia sẻ blog, tài liệu giáo dục, góp phần giảm kỳ thị HIV</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-3 flex items-center gap-2">
              <span>👥</span> Đội ngũ phát triển
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Nhóm phát triển gồm các chuyên gia công nghệ và bác sĩ có nhiều năm kinh nghiệm trong điều trị HIV/AIDS và phát triển phần mềm y tế.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-3 flex items-center gap-2">
              <span>🎯</span> Đối tượng phục vụ
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Hệ thống hướng đến phục vụ các đối tượng:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Người sống chung với HIV/AIDS</li>
              <li>Người có nguy cơ cao (MSM, chuyển giới nữ, người tiêm chích ma túy, bạn tình của người nhiễm HIV)</li>
              <li>Cán bộ y tế, bác sĩ và nhân viên tư vấn</li>
              <li>Cộng đồng, người thân của người nhiễm HIV</li>
              <li>Các tổ chức y tế và quản lý nhà nước</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-3 flex items-center gap-2">
              <span>🤝</span> Đối tác hỗ trợ
            </h2>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Bệnh viện Nhiệt Đới TP.HCM</li>
              <li>Viện Pasteur</li>
              <li>Tổ chức UNAIDS Việt Nam</li>
              <li>Trung tâm phòng, chống HIV/AIDS TP XYZ</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-3 flex items-center gap-2">
              <span>📞</span> Liên hệ
            </h2>
            <address className="not-italic text-gray-700 space-y-1">
              <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
              <p>Email: <a href="mailto:support@hiv-treatment.com" className="text-red-600 hover:underline">support@hiv-treatment.com</a></p>
              <p>Điện thoại: <a href="tel:0123456789" className="text-red-600 hover:underline">0123 456 789</a></p>
            </address>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-red-700 mb-8 border-b-2 border-red-600 pb-3">❓ Câu hỏi thường gặp (FAQ)</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-semibold hover:bg-red-50 transition"
                aria-expanded={openFAQIndex === i}
              >
                <span>{faq.question}</span>
                <svg className={`w-5 h-5 transform transition-transform ${openFAQIndex === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFAQIndex === i && (
                <div className="px-6 py-3 bg-red-50 text-gray-700 leading-relaxed border-t border-red-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tài liệu giáo dục */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-red-700 mb-8 border-b-2 border-red-600 pb-3">📚 Thư viện tài liệu giáo dục</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedDoc(doc.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedDoc(doc.link);
              }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{doc.title}</h3>
              <p className="text-gray-600 mb-5">{doc.description}</p>
              <button
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDoc(doc.link);
                }}
              >
                Xem tài liệu
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h10M10 12h10M10 18h10M4 6h.01M4 12h.01M4 18h.01" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
              <header className="flex justify-between items-center bg-red-600 text-white px-6 py-4 rounded-t-xl">
                <h3 className="text-xl font-semibold">Xem tài liệu</h3>
                <button onClick={() => setSelectedDoc(null)} className="p-2 hover:bg-red-700 rounded-full transition" aria-label="Đóng modal">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </header>
              <div className="flex-1 p-4 bg-gray-50 overflow-auto">
                <object data={selectedDoc} type="application/pdf" className="w-full h-[75vh] rounded-lg bg-white shadow-inner">
                  <p>
                    Trình duyệt của bạn không hỗ trợ xem PDF trực tiếp. {" "}
                    <a href={selectedDoc} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 underline">
                      Tải xuống tài liệu
                    </a>
                  </p>
                </object>
              </div>
              <footer className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => window.open(selectedDoc, "_blank")}
                  className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  Mở trong tab mới
                </button>
                <button onClick={() => setSelectedDoc(null)} className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Đóng
                </button>
              </footer>
            </div>
          </div>
        )}
        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{ bottom: 100, right: 24  }}
          icon={<PhoneOutlined />}
        >
          <FloatButton
            icon={<MessageOutlined />}
            tooltip={<div>Nhắn tư vấn</div>}
            onClick={() =>
              window.open("https://www.facebook.com/bich.tram.570234", "_blank")
            }
          />
          <FloatButton
  icon={<CalendarOutlined />}
  tooltip={<div>Đặt lịch khám</div>}
  onClick={() => navigate("/appointments")}
/>
          <FloatButton
            icon={<FilePdfOutlined />}
            tooltip={<div>Tài liệu</div>}
            onClick={() =>
              window.open(
                "https://www.prepwatch.org/wp-content/uploads/2019/05/Care_and_Treatment_Guidelines_Vietnam_2017.pdf",
                "_blank"
              )
            }
          />
        </FloatButton.Group>
      </section>
    </div>
  );
}
