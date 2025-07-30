

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  History,
  TestTube,
  Calendar,
  MessageCircle,
  User,
} from "lucide-react";

export default function PatientDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-600">
            Trang chính bệnh nhân
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Quản lý sức khỏe của bạn với các công cụ hỗ trợ toàn diện.
          </p>
        </div>


        <div className="bg-white rounded-2xl shadow-lg p-6 text-center animate-fade-in [animation-delay:0.2s]">
          <p className="text-gray-800 font-semibold">
            Đừng quên đặt lịch tái khám định kỳ để theo dõi sức khỏe!
          </p>
          <Link
            to="/appointments"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            <Calendar className="w-5 h-5" />
            Đặt lịch ngay
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-2xl shadow animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              <DashboardCard
                title="Lịch sử khám & điều trị"
                description="Xem lại các lần khám, đơn thuốc và quá trình điều trị."
                to={`/history/`}
                icon={<History className="w-6 h-6 text-red-500" />}
              />
              <DashboardCard
                title="Kết quả xét nghiệm"
                description="Theo dõi CD4, tải lượng HIV, phác đồ ARV được sử dụng."
                to={`/patient/result`}
                icon={<TestTube className="w-6 h-6 text-red-500" />}
              />
              <DashboardCard
                title="Đặt lịch khám"
                description="Chọn ngày, bác sĩ và yêu cầu khám, có thể ẩn danh."
                to="/appointments"
                icon={<Calendar className="w-6 h-6 text-red-500" />}
              />
              <DashboardCard
                title="Tư vấn trực tuyến"
                description="Đặt lịch tư vấn online với bác sĩ nếu cần hỗ trợ."
                to="/support"
                icon={<MessageCircle className="w-6 h-6 text-red-500" />}
              />
              <DashboardCard
                title="Hồ sơ cá nhân"
                description="Xem và cập nhật thông tin cá nhân."
                to="/users"
                icon={<User className="w-6 h-6 text-red-500" />}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, to, icon }) {
  return (
    <Link
      to={to}
      className="block p-6 bg-white rounded-2xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.4s]"
    >
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
