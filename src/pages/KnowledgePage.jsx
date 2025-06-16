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
      "SKĐS - Người nhiễm HIV thường nghĩ rằng, họ sẽ nhận được sự kỳ thị, xa lánh... thay vì thương cảm, sẻ chia từ cộng đồng. Vậy nên, để người bệnh chủ động và an tâm điều trị cần được sự tư vấn, quan tâm nhiều từ đội ngũ nhân viên y tế...",
    link: "https://bvquan5.medinet.gov.vn/chuyen-muc/nguoi-se-chia-khung-hoang-buon-vui-cung-benh-nhan-hiv-c16896-131217.aspx",
  },
  {
    title: "8 cách để hỗ trợ điều trị HIV hiệu quả và tăng cường hệ miễn dịch",
    description:
      "Thuốc điều trị HIV là chìa khóa để bệnh nhân HIV khỏe mạnh khi sống chung với loại virus này. Tuy nhiên, một số thói quen dưới đây có thể hỗ trợ việc điều trị hiệu quả hơn và tăng cường hệ miễn dịch của người nhiễm HIV",
    link: "https://vaac.gov.vn/8-cach-de-ho-tro-dieu-tri-hiv-hieu-qua-va-tang-cuong-he-mien-dich.html",
  },
  {
    title: "Lời khuyên bổ ích cho người nhiễm HIV/AIDS",
    description:
      "Đối với những người nhiễm HIV/AIDS, cần thêm vitamin và khoáng chất để giúp sửa chữa và chữa lành các tế bào bị hư hỏng, cải thiện hệ thống miễn dịch.",
    link: "https://moh.gov.vn/chuong-trinh-muc-tieu-quoc-gia/-/asset_publisher/7ng11fEWgASC/content/loi-khuyen-bo-ich-cho-nguoi-nhiem-hiv-aids",
  },
];

const faqItems = [
  {
    question: "HIV là gì và lây truyền qua những con đường nào?",
    answer:
      "HIV là virus gây suy giảm miễn dịch, chủ yếu lây truyền qua đường máu, quan hệ tình dục không an toàn và từ mẹ sang con trong thai kỳ hoặc khi cho con bú.",
  },
  {
    question: "Người nhiễm HIV có thể sống bình thường không?",
    answer:
      "Với việc điều trị đúng và tuân thủ phác đồ, người nhiễm HIV có thể sống lâu dài và chất lượng cuộc sống gần như bình thường.",
  },
  {
    question: "Làm thế nào để phòng tránh lây nhiễm HIV?",
    answer:
      "Sử dụng bao cao su khi quan hệ, không dùng chung kim tiêm, xét nghiệm HIV định kỳ và tuân thủ điều trị nếu nhiễm HIV.",
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
  
  // Bổ sung state để quản lý FAQ mở
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  // Hàm toggle mở/đóng FAQ
  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
        Trang kiến thức HIV
      </h1>

      <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
        Trang kiến thức này được xây dựng nhằm cung cấp những thông tin chính xác,
        thiết thực và dễ hiểu dành cho người nhiễm HIV cũng như gia đình, người
        thân và cộng đồng xung quanh. Tại đây, bạn sẽ tìm thấy các bài viết chia sẻ
        kinh nghiệm sống chung với HIV, lời khuyên về chăm sóc sức khỏe, hướng dẫn
        điều trị, tăng cường hệ miễn dịch, cũng như các nguồn lực hỗ trợ tinh thần
        và pháp lý. Mục tiêu của chúng tôi là góp phần nâng cao nhận thức, giảm
        thiểu kỳ thị và giúp mọi người tiếp cận thông tin một cách thuận tiện và
        an toàn nhất.
      </p>

      {/* Blog Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          ✍️ Blog chia sẻ kinh nghiệm
        </h2>
        <div className="mb-8">
          <img
            src={blogImg}
            alt="Blog cộng đồng"
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map(({ title, description, link }) => (
            <article
              key={title}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 font-medium hover:underline"
              >
                Đọc thêm →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Treatment Guides Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          💊 Hướng dẫn điều trị
        </h2>
        <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
          Mục Hướng dẫn điều trị cung cấp thông tin chi tiết về các phương pháp và
          liệu trình điều trị HIV hiện đại, giúp người bệnh hiểu rõ hơn về quá trình
          điều trị, tác dụng phụ và cách chăm sóc bản thân hiệu quả. Ngoài ra, còn có
          những lời khuyên về dinh dưỡng, luyện tập và nâng cao sức khỏe tinh thần,
          giúp bạn sống khỏe mạnh và tích cực hơn mỗi ngày.
        </p>
        <div className="space-y-6 max-w-4xl mx-auto">
          {treatmentGuides.map(({ title, content }, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-700">{content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-red-700 mb-8 border-b-2 border-red-600 pb-3">
          ❓ Câu hỏi thường gặp (FAQ)
        </h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-semibold hover:bg-red-50 transition"
                aria-expanded={openFAQIndex === i}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${openFAQIndex === i ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
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
        
      </section>
    </main>
  );
}
