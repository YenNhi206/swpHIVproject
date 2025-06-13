import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, Users, AlertTriangle, UserPlus, RefreshCw } from 'lucide-react';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ngày hiện tại (01:05 AM +07, 13/06/2025)
  const today = new Date('2025-06-13T01:05:00+07:00').toISOString().split('T')[0];

  useEffect(() => {
    // Giả lập fetch dữ liệu lịch hẹn hôm nay
    setTimeout(() => {
      setAppointments([
        { id: 1, time: '09:00', patient: 'Nguyễn Văn B', purpose: 'Khám định kỳ' },
        { id: 2, time: '10:30', patient: 'Trần Thị C', purpose: 'Cập nhật phác đồ' },
        { id: 3, time: '13:00', patient: 'Phạm Văn D', purpose: 'Tư vấn uống thuốc' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const patients = [
    { id: 1, name: 'Nguyễn Văn B' },
    { id: 2, name: 'Trần Thị C' },
    { id: 3, name: 'Phạm Văn D' },
  ];

  const alerts = [
    { id: 1, patient: 'Nguyễn Văn B', message: 'Chưa lấy thuốc (5 ngày trễ)', action: 'Liên hệ' },
    { id: 2, patient: 'Trần Thị C', message: 'Cần xét nghiệm VL', action: 'Xem chi tiết' },
    { id: 3, patient: 'Phạm Văn D', message: 'Kết quả CD4 giảm', action: 'Xem hồ sơ' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-10 text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold text-red-700 mb-2 tracking-wide">Bảng Điều Khiển Bác Sĩ</h1>
          <p className="text-gray-500 text-lg">Theo dõi và quản lý điều trị HIV</p>
        </div>

        {/* Lịch hẹn hôm nay */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-600 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.2s]">
          <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Lịch Hẹn Hôm Nay
          </h2>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition cursor-pointer"
                    onClick={() => navigate(`/doctorappointments/${appt.id}`)}
                  >
                    <p className="text-gray-700 font-medium">
                      {appt.time} - {appt.patient} - {appt.purpose}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/doctorappointments')}
                className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Xem tất cả lịch hẹn
              </button>
            </>
          )}
        </section>

        {/* Grid main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Phác đồ điều trị */}
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.3s]">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              Phác Đồ Điều Trị
            </h2>
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
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.3s]">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-red-500" />
              Bệnh Nhân Đang Điều Trị
            </h2>
            <ul className="space-y-3 text-gray-700">
              {patients.map((patient) => (
                <li key={patient.id} className="flex justify-between border-b pb-2 hover:bg-gray-50 transition-colors">
                  <span>{patient.name}</span>
                  <button
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Xem hồ sơ
                  </button>
                </li>
              ))}
              <button
                onClick={() => navigate('/patients/add')}
                className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                <UserPlus className="w-5 h-5 inline mr-2" />
                Thêm bệnh nhân mới
              </button>
            </ul>
          </section>
        </div>

        {/* Alerts */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border border-red-200 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.4s]">
          <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Cảnh Báo & Nhắc Nhở
          </h2>
          <ul className="space-y-3 text-gray-700">
            {alerts.map((alert) => (
              <li key={alert.id} className="flex items-center justify-between border-b pb-2 hover:bg-gray-50 transition-colors">
                <span>{alert.patient} - {alert.message}</span>
                <button
                  onClick={() => navigate(`/patients/${alerts.findIndex(a => a.id === alert.id) + 1}`)}
                  className="text-sm text-red-600 hover:underline"
                >
                  {alert.action}
                </button>
              </li>
            ))}
            <button
              onClick={() => navigate('/alerts')}
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              <RefreshCw className="w-5 h-5 inline mr-2" />
              Cập nhật cảnh báo
            </button>
          </ul>
        </section>
      </div>
    </div>
  );
}