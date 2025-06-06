import React, { useState, useEffect } from "react";

const mockPatients = [
  { id: 1, name: "Nguyễn Văn A", appointmentDate: "2025-06-01", paid: true },
  { id: 2, name: "Trần Thị B", appointmentDate: "2025-06-02", paid: false },
  { id: 3, name: "Lê Văn C", appointmentDate: "2025-06-03", paid: true },
  { id: 4, name: "Phạm Thị D", appointmentDate: "2025-06-04", paid: false },
];

export default function AdminDashboard() {
  const [patients, setPatients] = useState([]);
  const [filterPaid, setFilterPaid] = useState("all"); // all, paid, unpaid

  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setPatients(mockPatients);
  }, []);

  const filteredPatients = patients.filter((p) => {
    if (filterPaid === "paid") return p.paid;
    if (filterPaid === "unpaid") return !p.paid;
    return true;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Trang quản trị hệ thống</h1>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

      {/* Biểu đồ và danh sách bác sĩ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

      {/* Bảng quản lý bệnh nhân */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Quản lý bệnh nhân và thanh toán</h2>

        <div className="mb-4">
          <label className="mr-2 font-semibold">Lọc theo trạng thái thanh toán:</label>
          <select
            className="border rounded p-1"
            value={filterPaid}
            onChange={(e) => setFilterPaid(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="paid">Đã thanh toán</option>
            <option value="unpaid">Chưa thanh toán</option>
          </select>
        </div>

        <table className="min-w-full bg-white rounded overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 text-left">Tên bệnh nhân</th>
              <th className="py-2 px-4 text-left">Ngày đặt lịch</th>
              <th className="py-2 px-4 text-left">Trạng thái thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            )}
            {filteredPatients.map((patient) => (
              <tr
                key={patient.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-2 px-4">{patient.name}</td>
                <td className="py-2 px-4">{patient.appointmentDate}</td>
                <td
                  className={`py-2 px-4 font-semibold ${patient.paid ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {patient.paid ? "Đã thanh toán" : "Chưa thanh toán"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
