import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Trang quản trị hệ thống</h1>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Tổng người dùng</p>
          <p className="text-2xl font-semibold">1,240</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Bệnh nhân đang điều trị</p>
          <p className="text-2xl font-semibold">320</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <p className="text-gray-500">Cuộc hẹn chờ duyệt</p>
          <p className="text-2xl font-semibold">45</p>
        </div>
      </div>

      {/* Biểu đồ và danh sách */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow p-4 rounded-xl h-64 flex items-center justify-center">
          <p className="text-gray-400">[Biểu đồ tần suất lịch khám]</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl h-64 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Bác sĩ nổi bật</h2>
          <ul className="space-y-2">
            <li className="border p-2 rounded">Dr. Nguyễn Văn A - Nội khoa</li>
            <li className="border p-2 rounded">Dr. Trần Thị B - HIV/AIDS</li>
            <li className="border p-2 rounded">Dr. Lê Văn C - Truyền nhiễm</li>
          </ul>
        </div>
      </div>
    </div>
  );
}