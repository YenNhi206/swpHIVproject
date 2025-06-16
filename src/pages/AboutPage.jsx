import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import healthcareImage from "../assets/healthcare.jpg";

// ✅ Đảm bảo bạn đã cài antd 5+
import { FloatButton } from "antd";
import {
  MessageOutlined,
  CalendarOutlined,
  FilePdfOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

export default function AboutPage() {
  const navigate = useNavigate();
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

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
              🎯 Mục đích và sứ mệnh
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Hệ thống <strong>HIV Treatment and Medical Services System</strong> được phát triển nhằm tăng cường tiếp cận dịch vụ y tế và điều trị HIV cho bệnh nhân tại cơ sở y tế. Chúng tôi cam kết hỗ trợ người bệnh một cách toàn diện, minh bạch và bảo mật.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-3 flex items-center gap-2">
              🛠️ Chức năng chính
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
              👥 Đội ngũ phát triển
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Nhóm phát triển gồm các chuyên gia công nghệ và bác sĩ có nhiều năm kinh nghiệm trong điều trị HIV/AIDS và phát triển phần mềm y tế.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-3 flex items-center gap-2">
              🎯 Đối tượng phục vụ
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
              🤝 Đối tác hỗ trợ
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
              📞 Liên hệ
            </h2>
            <address className="not-italic text-gray-700 space-y-1">
              <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
              <p>Email: <a href="mailto:support@hiv-treatment.com" className="text-red-600 hover:underline">support@hiv-treatment.com</a></p>
              <p>Điện thoại: <a href="tel:0123456789" className="text-red-600 hover:underline">0123 456 789</a></p>
            </address>
          </div>
        </div>
      </section>

      {/* Float Button Group */}
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ bottom: 100, right: 24 }}
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
    </div>
  );
}
