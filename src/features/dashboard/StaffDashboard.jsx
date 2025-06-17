import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, PlusCircle } from 'lucide-react';

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
  // Form dữ liệu bệnh nhân mới
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    date: '',
    time: '',
    service: '',
  });
  const [errorNewPatient, setErrorNewPatient] = useState('');

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

  // Xử lý thay đổi form thêm bệnh nhân mới
  const handleNewPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
    setErrorNewPatient('');
  };

  // Thêm bệnh nhân mới vào danh sách
  const handleAddNewPatient = () => {
    // Kiểm tra dữ liệu đơn giản
    if (!newPatient.fullName || !newPatient.date || !newPatient.time || !newPatient.service) {
      setErrorNewPatient('Vui lòng điền đầy đủ thông tin');
      return;
    }
    const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1;
    const newAppt = {
      id: newId,
      fullName: newPatient.fullName,
      date: newPatient.date,
      time: newPatient.time,
      service: newPatient.service,
      status: 'Chưa đến',
    };
    setAppointments((prev) => [...prev, newAppt]);

    // Nếu ngày thêm trùng với ngày đang xem, không cần đổi selectedDate
    // Có thể reset form
    setNewPatient({
      fullName: '',
      date: '',
      time: '',
      service: '',
    });
    setErrorNewPatient('');
  };

  const filteredAppointments = appointments.filter(
    (appt) => appt.date === selectedDate
  );

  return (
    <div className="p-8 min-h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">
        Quản Lý Lịch Hẹn Điều Trị HIV
      </h1>

      {/* Chọn ngày làm việc */}
      <div className="mb-6 flex justify-center items-center gap-4">
        <label className="font-semibold text-lg text-red-700">Chọn ngày làm việc:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Bảng lịch hẹn */}
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

      {/* Form thêm bệnh nhân mới */}
      <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2">
          <PlusCircle className="w-6 h-6" />
          Thêm bệnh nhân mới
        </h2>
        {errorNewPatient && <p className="text-red-600 mb-2">{errorNewPatient}</p>}
        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={newPatient.fullName}
            onChange={handleNewPatientChange}
            placeholder="Họ tên bệnh nhân"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="date"
            name="date"
            value={newPatient.date}
            onChange={handleNewPatientChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="time"
            name="time"
            value={newPatient.time}
            onChange={handleNewPatientChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="service"
            value={newPatient.service}
            onChange={handleNewPatientChange}
            placeholder="Dịch vụ điều trị"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleAddNewPatient}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Thêm bệnh nhân
          </button>
        </div>
      </div>
    </div>
  );
}
