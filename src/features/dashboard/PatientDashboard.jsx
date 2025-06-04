import React from "react";
import { Link } from "react-router-dom";

export default function PatientDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600">Trang chính bệnh nhân</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Lịch sử khám */}
        <DashboardCard
          title="Lịch sử khám & điều trị"
          description="Xem lại các lần khám, đơn thuốc và quá trình điều trị."
          to="/history"
        />

        {/* 2. Kết quả xét nghiệm */}
        <DashboardCard
          title="Kết quả xét nghiệm"
          description="Theo dõi CD4, tải lượng HIV, phác đồ ARV được sử dụng."
          to="/treatment-results"
        />

        {/* 3. Đặt lịch khám mới */}
        <DashboardCard
          title="Đặt lịch khám"
          description="Chọn ngày, bác sĩ và yêu cầu khám, có thể ẩn danh."
          to="/appointments"
        />

        {/* 4. Nhắc lịch uống thuốc & tái khám */}
        <DashboardCard
          title="Nhắc lịch"
          description="Xem và nhận thông báo nhắc nhở uống thuốc & tái khám."
          to="/reminder"
        />

        {/* 5. Hỗ trợ tư vấn online */}
        <DashboardCard
          title="Tư vấn trực tuyến"
          description="Đặt lịch tư vấn online với bác sĩ nếu cần hỗ trợ."
          to="/support"
        />

        {/* 6. Hồ sơ cá nhân */}
        <DashboardCard
          title="Hồ sơ cá nhân"
          description="Xem và cập nhật thông tin cá nhân."
          to="/users"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, description, to }) {
  return (
    <Link to={to} className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </Link>
  );
}