import React from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-red-700 mb-2 tracking-wide">Bảng Điều Khiển Bác Sĩ</h1>
        <p className="text-gray-500 text-lg">Quản lý bệnh nhân và theo dõi điều trị HIV</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <button
            onClick={() => navigate('/doctorappointments')}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300 group flex justify-between items-center"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-1 group-hover:text-red-600 transition-all">
                Lịch Hẹn Hôm Nay
              </h3>
              <p className="text-gray-500 text-sm">Xem và quản lý các cuộc hẹn</p>
            </div>
            <div className="text-red-500 group-hover:translate-x-2 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Info */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A12 12 0 0112 2a12 12 0 016.879 15.804M15 11h.01M9 11h.01M9 16h6" />
              </svg>
              Thông Tin Cá Nhân
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Họ tên:</span>
                <span className="font-medium">TS. Nguyễn Văn A</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Chuyên môn:</span>
                <span className="font-medium">HIV/AIDS</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Bằng cấp:</span>
                <span className="font-medium">Bác sĩ CK II</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Kinh nghiệm:</span>
                <span className="font-medium">10 năm</span>
              </div>
            </div>
          </section>

          {/* Treatment Plan */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Phác Đồ Điều Trị</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all cursor-pointer"
                onClick={() => navigate('/treatment')}>
                <p className="text-gray-700 mb-1">Phác đồ hiện tại:</p>
                <p className="text-red-700 font-semibold text-lg">TDF + 3TC + DTG</p>
                <p className="text-red-700 font-semibold text-lg">AZT + 3TC + EFV</p>
                <p className="text-red-700 font-semibold text-lg">     ...     </p>
              </div>
              <button
                onClick={() => navigate('/treatment')}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                Tùy chỉnh phác đồ
              </button>
            </div>
          </section>

          {/* Quick Note */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4h12v2H4V4zM4 7h12v2H4V7zM4 10h8v2H4v-2z" />
              </svg>
              Ghi Chú Nhanh
            </h2>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Thêm ghi chú..."
            ></textarea>
            <button className="mt-4 w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300">
              Lưu ghi chú
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}