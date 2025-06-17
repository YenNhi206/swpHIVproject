import React, { useState } from "react";
import blogImg from "../assets/blog.jpg";

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
    icon: "💊",
  },
  {
    title: "Lời khuyên về dinh dưỡng và sinh hoạt",
    content:
      "Bổ sung đầy đủ dinh dưỡng, tập thể dục đều đặn, tránh căng thẳng và giữ tinh thần lạc quan giúp tăng cường hệ miễn dịch.",
    icon: "🥗",
  },
];

export default function KnowledgePage() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <section className="text-center mb-16 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-red-700 mb-4 tracking-tight animate-slide-in">
          Trang Kiến Thức HIV
        </h1>
        <p className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
          Thông tin chính xác, chuyên sâu và dễ tiếp cận về HIV, hỗ trợ người nhiễm, gia đình và cộng đồng để nâng cao nhận thức và giảm kỳ thị.
        </p>
      </section>

      {/* Blog Section */}
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-red-700 mb-8 text-center flex items-center justify-center gap-2 animate-slide-in">
          <span>✍️</span> Blog Chia Sẻ Kinh Nghiệm
        </h2>
        <div className="mb-8 relative">
          <img
            src={blogImg}
            alt="Blog cộng đồng"
            className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg transform hover:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map(({ title, description, link }, idx) => (
            <article
              key={title}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{description}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium"
              >
                Đọc thêm
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Treatment Guides Section */}
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-red-700 mb-8 text-center flex items-center justify-center gap-2 animate-slide-in">
          <span>💉</span> Hướng Dẫn Điều Trị
        </h2>
        <p className="text-base text-gray-700 mb-8 max-w-2xl mx-auto text-center leading-relaxed">
          Phương pháp điều trị HIV tiên tiến và lời khuyên thiết thực để sống tích cực, khỏe mạnh.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {treatmentGuides.map(({ title, content, icon }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-3 hover:shadow-lg transition-all duration-200"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-red-700 mb-8 text-center flex items-center justify-center gap-2 animate-slide-in">
          <span>❓</span> Câu Hỏi Thường Gặp (FAQ)
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqItems.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 font-semibold hover:bg-red-50 transition-colors"
                aria-expanded={openFAQIndex === i}
              >
                <span className="text-base">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${openFAQIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFAQIndex === i && (
                <div className="px-6 py-5 bg-red-50 text-gray-700 text-sm leading-relaxed animate-slide-down">
                  {faq.detailedContent}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Educational Library Section */}
      <section className="mb-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-red-700 mb-8 text-center flex items-center justify-center gap-2 animate-slide-in">
          <span>📚</span> Thư Viện Tài Liệu Giáo Dục
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedDoc(doc.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedDoc(doc.link);
              }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{doc.title}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{doc.description}</p>
              <button
                className="inline-flex items-center px-3 py-1.5 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors font-medium text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDoc(doc.link);
                }}
              >
                Xem tài liệu
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
              <header className="flex justify-between items-center bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-4 rounded-t-2xl">
                <h3 className="text-lg font-semibold">Xem Tài Liệu</h3>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-1.5 hover:bg-red-900 rounded-full transition"
                  aria-label="Đóng"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
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
                <button
                  onClick={() => window.open(selectedDoc, "_blank")}
                  className="px-4 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 transition font-medium text-sm"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  Mở trong tab mới
                </button>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-1.5 bg-red-700 text-white rounded-lg hover:bg-red-800 transition font-medium text-sm"
                >
                  Đóng
                </button>
              </footer>
            </div>
          </div>
        )}
      </section>

    </main>
  );
}