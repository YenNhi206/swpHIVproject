import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

// Dữ liệu thử
const mockAppointments = [
  { id: 1, fullName: "Nguyễn Văn A", date: "2025-06-16", time: "09:00", service: "Tư vấn điều trị", status: "Chưa đến" },
  { id: 2, fullName: "Trần Thị B", date: "2025-06-16", time: "10:30", service: "Lấy thuốc ARV", status: "Chưa đến" },
  { id: 3, fullName: "Lê Văn C", date: "2025-06-17", time: "14:00", service: "Xét nghiệm tải lượng virus", status: "Chưa đến" },
  { id: 4, fullName: "Phạm Thị D", date: "2025-06-18", time: "08:00", service: "Tư vấn tâm lý", status: "Chưa đến" },
];

export default function StaffAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setAppointments(mockAppointments);
    const today = new Date().toISOString().split('T')[0]; // Lấy ngày hôm nay
    setSelectedDate(today);
  }, []);

  const handleUpdateStatus = (id, status) => {
    const updatedAppointments = appointments.map((appt) =>
      appt.id === id ? { ...appt, status } : appt
    );
    setAppointments(updatedAppointments);
  };

  const filteredAppointments = appointments.filter(
    (appt) => appt.date === selectedDate
  );

  return (
    <div className="p-8 min-h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">
        Quản Lý Lịch Hẹn Điều Trị HIV
      </h1>

      <div className="mb-6 flex justify-center items-center gap-4">
        <label className="font-semibold text-lg text-red-700">Chọn ngày làm việc:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-center text-red-600 font-semibold">Không có lịch hẹn trong ngày.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-red-300 rounded-lg shadow-lg bg-white">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-4 border">Họ tên bệnh nhân</th>
                <th className="p-4 border">Giờ hẹn</th>
                <th className="p-4 border">Dịch vụ điều trị</th>
                <th className="p-4 border">Trạng thái</th>
                <th className="p-4 border">Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-red-100 transition">
                  <td className="p-4 border">{appt.fullName}</td>
                  <td className="p-4 border">{appt.time}</td>
                  <td className="p-4 border">{appt.service}</td>
                  <td className={`p-4 border font-semibold ${appt.status === 'Đã đến' ? 'text-green-600' : appt.status === 'Vắng' ? 'text-red-600' : 'text-gray-600'}`}>
                    {appt.status}
                  </td>
                  <td className="p-4 border">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleUpdateStatus(appt.id, "Đã đến")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Đã đến
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(appt.id, "Vắng")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                      >
                        <XCircle className="w-5 h-5" />
                        Vắng
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
