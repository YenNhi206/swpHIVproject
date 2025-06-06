
import React, { useState } from "react";
import healthcareImage from "../assets/healthcare.jpg";

export default function AboutPage() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const documents = [
    {
      title: "Hướng dẫn điều trị HIV cho người mới phát hiện",
      description: "Tài liệu cơ bản giúp bạn hiểu về các bước điều trị ban đầu, xét nghiệm cần thiết và tư vấn tâm lý.",
      link: "/docs/hiv-treatment-guide.pdf",
    },
    {
      title: "Tài liệu giáo dục phòng ngừa HIV",
      description: "Thông tin giúp bạn hiểu cách phòng tránh lây nhiễm HIV trong cộng đồng và trong gia đình.",
      link: "/docs/hiv-prevention.pdf",
    },
  ];
  

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-white rounded-lg shadow">
      {/* Ảnh đầu trang */}
      <div className="mb-8">
        <img src={healthcareImage} alt="Healthcare" className="rounded-xl shadow-md w-full h-64 object-cover" />
      </div>

      {/* Giới thiệu hệ thống */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Giới thiệu về hệ thống</h1>
        <h2 className="text-xl font-semibold text-red-600 mb-2">🎯 Mục đích và sứ mệnh</h2>
        <p className="text-gray-700 mb-4">
          Hệ thống <strong>HIV Treatment and Medical Services System</strong> được phát triển nhằm tăng cường tiếp cận dịch vụ y tế và điều trị HIV cho bệnh nhân tại cơ sở y tế. Chúng tôi cam kết hỗ trợ người bệnh một cách toàn diện, minh bạch và bảo mật.
        </p>

        <h2 className="text-xl font-semibold text-red-600 mb-2">🛠️ Chức năng chính</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>Đăng ký lịch khám & điều trị, chỉ định bác sĩ điều trị</li>
          <li>Tra cứu kết quả xét nghiệm (CD4, tải lượng HIV, phác đồ ARV)</li>
          <li>Nhắc nhở lịch tái khám & uống thuốc theo phác đồ</li>
          <li>Đặt lịch hẹn trực tuyến, đăng ký ẩn danh</li>
          <li>Quản lý hồ sơ bác sĩ và bệnh nhân</li>
          <li>Dashboard & báo cáo phục vụ quản lý và điều trị</li>
          <li>Chia sẻ blog, tài liệu giáo dục, góp phần giảm kỳ thị HIV</li>
        </ul>

        <h2 className="text-xl font-semibold text-red-600 mb-2">👥 Đội ngũ phát triển</h2>
        <p className="text-gray-700 mb-4">
          Nhóm phát triển gồm các chuyên gia công nghệ và bác sĩ có nhiều năm kinh nghiệm trong điều trị HIV/AIDS và phát triển phần mềm y tế.
        </p>

        <h2 className="text-xl font-semibold text-red-600 mb-2">📞 Liên hệ</h2>
        <p className="text-gray-700">Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
        <p className="text-gray-700">Email: support@hiv-treatment.com</p>
        <p className="text-gray-700">Điện thoại: 0123 456 789</p>
      </section>

      {/* Blog chia sẻ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-red-700 mb-4">📘 Chia sẻ – Blog cộng đồng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Sống tích cực cùng HIV – Câu chuyện của Minh</h3>
            <p className="text-gray-600 text-sm">
              Khi biết mình dương tính với HIV vào năm 2018, tôi từng cảm thấy thế giới sụp đổ. Nhưng nhờ sự hỗ trợ từ y bác sĩ và cộng đồng, tôi đã vượt qua được tâm lý và sống khỏe mạnh, hạnh phúc.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Làm sao để không kỳ thị người nhiễm HIV?</h3>
            <p className="text-gray-600 text-sm">
              HIV không lây qua tiếp xúc thông thường. Điều quan trọng là chúng ta cần hiểu đúng, lan tỏa yêu thương và cùng nhau xoá bỏ định kiến xã hội với người sống chung với HIV.
            </p>
          </div>
        </div>
      </section>

     {/* Tài liệu giáo dục */}
      <section>
        <h2 className="text-2xl font-bold text-red-700 mb-4">📚 Thư viện tài liệu giáo dục</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{doc.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
              <button
                onClick={() => setSelectedDoc(doc.link)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Xem tài liệu
              </button>
            </div>
          ))}
        </div>

        {/* Modal hiển thị tài liệu PDF */}
      {selectedDoc && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
    <div className="relative bg-white w-[95%] max-w-5xl rounded-xl shadow-2xl max-h-[90vh] flex flex-col">
      {/* Header */}
       <div className="flex items-center justify-between px-6 py-4 bg-red-600 rounded-t-xl border-b border-red-700">
        <h3 className="text-xl font-semibold text-white">Xem tài liệu</h3>
        <button
          onClick={() => setSelectedDoc(null)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <object
          data={selectedDoc}
          type="hiv-treatment-guide"
          className="w-full h-[75vh] rounded-lg bg-white shadow-inner"
        >
          <p>Trình duyệt của bạn không hỗ trợ xem PDF trực tiếp. 
            <a 
              href={selectedDoc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 ml-1"
            >
              Tải xuống tài liệu
            </a>
          </p>
        </object>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
        <button
          onClick={() => window.open(selectedDoc, '_blank')}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          Mở trong tab mới
        </button>
        <button
          onClick={() => setSelectedDoc(null)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
)}
      </section>
    </div>
  );
}
