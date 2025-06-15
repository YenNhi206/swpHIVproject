import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, User, Filter, Edit, CheckCircle } from 'lucide-react';

export default function DoctorAppointmentList() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Ngày giờ hiện tại (03:53 PM +07, 13/06/2025)
  const currentDate = new Date().toLocaleString('vi-VN', {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour12: false,
});


  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setTimeout(() => {
      setAppointments([
        {
          id: 1,
          patientName: 'Nguyễn Văn A',
          date: '2025-06-10',
          time: '09:00',
          status: 'Chờ khám',
          reason: 'Khám định kỳ',
          doctor: 'Dr. Nguyễn Văn A',
          cd4: 520,
          vl: 'Không phát hiện',
        },
        {
          id: 2,
          patientName: 'Trần Thị B',
          date: '2025-06-11',
          time: '10:30',
          status: 'Đã khám',
          reason: 'Cập nhật phác đồ',
          doctor: 'Dr. Trần Thị B',
          cd4: 480,
          vl: 150,
        },
        {
          id: 3,
          patientName: 'Phạm Văn C',
          date: '2025-06-13',
          time: '13:00',
          status: 'Chờ khám',
          reason: 'Tư vấn uống thuốc',
          doctor: 'Dr. Phạm Văn C',
          cd4: 300,
          vl: 200,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredAppointments = appointments.filter((appt) =>
    !filterDate || appt.date === filterDate
  );

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
    console.log(`Cập nhật trạng thái lịch hẹn ${id} thành ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center animate-fade-in">
          <h2 className="text-2xl font-bold text-red-700 flex items-center gap-2">
            <CalendarCheck className="w-6 h-6" />
            Lịch hẹn của bác sĩ
          </h2>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-red-500" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

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
          <div className="space-y-4 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.2s]">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-5 h-5 text-red-500" />
                      <span className="font-semibold">{appointment.patientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarCheck className="w-5 h-5 text-red-500" />
                      <span>
                        {appointment.date} lúc {appointment.time} - {appointment.reason} (Bác sĩ: {appointment.doctor})
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      CD4: {appointment.cd4}, VL: {appointment.vl}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/appointments/${appointment.id}`)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-300 text-sm"
                    >
                      <Edit className="w-4 h-4 inline" /> Xem chi tiết
                    </button>
                    {appointment.status === 'Chờ khám' && (
                      <button
                        onClick={() => updateStatus(appointment.id, 'Đã khám')}
                        className="px-3 py-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors duration-300 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 inline" /> Hoàn thành
                      </button>
                    )}
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Không có lịch hẹn nào.</p>
            )}
          </div>
        )}

        <div className="text-center mt-6 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.3s]">
          <button
            onClick={() => navigate('/doctor')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Quay về trang chủ
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-2">Thời gian: {currentDate}</p>
      </div>
    </div>
  );
}