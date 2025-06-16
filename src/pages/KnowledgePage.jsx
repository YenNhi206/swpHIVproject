import React, { useState } from "react";

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
            src="/images/blog-community.jpg"
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
                  className={`w-5 h-5 transform transition-transform ${
                    openFAQIndex === i ? "rotate-180" : ""
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
    </main>
  );
}
