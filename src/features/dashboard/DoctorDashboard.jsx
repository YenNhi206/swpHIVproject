import React from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-red-700 mb-2 tracking-wide">Bảng Điều Khiển Bác Sĩ</h1>
        <p className="text-gray-500 text-lg">Theo dõi và quản lý điều trị HIV</p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Lịch hẹn hôm nay */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-600">
          <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
            📅 Lịch Hẹn Hôm Nay
          </h2>
          <div className="space-y-3">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition cursor-pointer"
              onClick={() => navigate('/doctorappointments')}>
              <p className="text-gray-700 font-medium">09:00 - Nguyễn Văn B - Khám định kỳ</p>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition cursor-pointer"
              onClick={() => navigate('/doctorappointments')}>
              <p className="text-gray-700 font-medium">10:30 - Trần Thị C - Cập nhật phác đồ</p>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition cursor-pointer"
              onClick={() => navigate('/doctorappointments')}>
              <p className="text-gray-700 font-medium">13:00 - Phạm Văn D - Tư vấn uống thuốc</p>
            </div>
            <button
              onClick={() => navigate('/doctorappointments')}
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Xem tất cả lịch hẹn
            </button>
          </div>
        </section>

        {/* Grid main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Phác đồ điều trị */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Phác Đồ Điều Trị</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-700 mb-1">Phác đồ hiện tại:</p>
                <p className="text-red-700 font-semibold text-lg">TDF + 3TC + DTG</p>
                <p className="text-red-700 font-semibold text-lg">AZT + 3TC + EFV</p>
              </div>
              <button
                onClick={() => navigate('/treatment')}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Tùy chỉnh phác đồ
              </button>
            </div>
          </section>

          {/* Danh sách bệnh nhân */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Bệnh Nhân Đang Điều Trị</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex justify-between border-b pb-2">
                <span>Nguyễn Văn B</span>
                <button className="text-sm text-red-600 hover:underline">Xem hồ sơ</button>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Trần Thị C</span>
                <button className="text-sm text-red-600 hover:underline">Xem hồ sơ</button>
              </li>
              <li className="flex justify-between">
                <span>Phạm Văn D</span>
                <button className="text-sm text-red-600 hover:underline">Xem hồ sơ</button>
              </li>
            </ul>
          </section>
        </div>

        {/* Alerts */}
        <section className="bg-white p-6 rounded-2xl shadow border border-red-200">
          <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
            ⚠️ Cảnh Báo & Nhắc Nhở
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center justify-between border-b pb-2">
              <span>Nguyễn Văn B chưa lấy thuốc (5 ngày trễ)</span>
              <button className="text-sm text-red-600 hover:underline">Liên hệ</button>
            </li>
            <li className="flex items-center justify-between border-b pb-2">
              <span>Trần Thị C cần xét nghiệm VL</span>
              <button className="text-sm text-red-600 hover:underline">Xem chi tiết</button>
            </li>
            <li className="flex items-center justify-between">
              <span>Phạm Văn D có kết quả CD4 giảm</span>
              <button className="text-sm text-red-600 hover:underline">Xem hồ sơ</button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
