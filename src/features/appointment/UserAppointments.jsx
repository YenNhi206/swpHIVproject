import React, { useEffect, useState } from 'react';
import { CalendarDays, User, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserAppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fake API call - bạn có thể thay bằng real API call sau này
  useEffect(() => {
    setIsLoading(true);
    const fakeData = [
      {
        id: 1,
        doctorName: 'BS. Nguyễn Văn A',
        date: '2025-06-02',
        time: '14:00',
        status: 'Chờ xác nhận',
      },
      {
        id: 2,
        doctorName: 'BS. Trần Thị B',
        date: '2025-06-05',
        time: '09:00',
        status: 'Đã xác nhận',
      },
    ];
    // Giả lập thời gian fetch dữ liệu
    setTimeout(() => {
      setAppointments(fakeData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
          Lịch hẹn của bạn
        </h2>

        {/* Skeleton Loading */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 bg-gray-50 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <p className="text-center text-gray-500 italic">
                Bạn chưa có lịch hẹn nào.
              </p>
            ) : (
              appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="border border-gray-200 rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 text-gray-800">
                    <User className="w-5 h-5 text-red-500" />
                    <span className="font-medium">{appt.doctorName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 mt-3">
                    <CalendarDays className="w-5 h-5 text-red-500" />
                    <span>Ngày: {appt.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 mt-3">
                    <Clock className="w-5 h-5 text-red-500" />
                    <span>Giờ: {appt.time}</span>
                  </div>
                  <div
                    className={`mt-3 text-sm font-medium italic ${
                      appt.status === 'Đã xác nhận'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    Trạng thái: {appt.status}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="mt-8 w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}