import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Giới thiệu về hệ thống</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mục đích và sứ mệnh</h2>
        <p>
          Hệ thống <strong>HIV Treatment and Medical Services System</strong> được phát triển nhằm tăng cường
          tiếp cận dịch vụ y tế và điều trị HIV cho bệnh nhân tại cơ sở y tế. Chúng tôi cam kết hỗ trợ người
          bệnh một cách toàn diện, minh bạch và bảo mật.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Chức năng chính</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Đăng ký lịch khám & điều trị, chỉ định bác sĩ điều trị</li>
          <li>Tra cứu kết quả xét nghiệm (CD4, tải lượng HIV, phác đồ ARV)</li>
          <li>Nhắc nhở lịch tái khám & uống thuốc theo phác đồ</li>
          <li>Đặt lịch hẹn trực tuyến, đăng ký ẩn danh</li>
          <li>Quản lý hồ sơ bác sĩ và bệnh nhân</li>
          <li>Dashboard & báo cáo phục vụ quản lý và điều trị</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Đội ngũ phát triển</h2>
        <p>
          Nhóm phát triển bao gồm các chuyên gia công nghệ và y tế với nhiều năm kinh nghiệm trong lĩnh vực chăm sóc sức khỏe HIV.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Liên hệ</h2>
        <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
        <p>Email: support@hiv-treatment.com</p>
        <p>Điện thoại: 0123 456 789</p>
      </section>
    </div>
  );
}
