import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Không thể tải lịch hẹn từ máy chủ");
        const data = await res.json();
        setAppointments(data);


        const today = new Date().toLocaleDateString('en-CA', {
          timeZone: 'Asia/Ho_Chi_Minh'
        });

        const filteredAppointments = data.filter((a) => {
          if (!a.appointmentDate) return false;

          const appointmentDate = new Date(a.appointmentDate);
          const appointmentDateStr = appointmentDate.toLocaleDateString('en-CA', {
            timeZone: 'Asia/Ho_Chi_Minh'
          });

          return appointmentDateStr === today;
        });

        setTodayAppointments(filteredAppointments);
      } catch (error) {
        console.error("Lỗi khi tải lịch hẹn:", error.message);
        setAppointments([]);
        setTodayAppointments([]);
      }
    };

    fetchAppointments();
  }, []);


  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Ho_Chi_Minh'
    });
  };


  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh'
    });
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'BOOKED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-8">
        Trang Chủ Nhân Viên
      </h1>

      <div className="grid grid-cols-1 gap-6 mb-8">

        <div className="bg-white shadow rounded-xl border-l-4 border-red-500">
          <button
            onClick={() => setShowAppointments(!showAppointments)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition rounded-xl"
          >
            <div className="flex items-center gap-4">
              <Calendar size={32} className="text-red-500" />
              <div className="text-left">
                <p className="text-gray-500">Lịch hẹn hôm nay</p>
                <p className="text-xl font-bold">{todayAppointments.length}</p>
              </div>
            </div>
            {todayAppointments.length > 0 && (
              <div className="flex items-center gap-2 text-gray-500">
                <span className="text-sm">Xem chi tiết</span>
                {showAppointments ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            )}
          </button>


          {showAppointments && todayAppointments.length > 0 && (
            <div className="px-6 pb-6 border-t">
              <div className="pt-4 space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <User size={20} className="text-red-500" />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {appointment.fullName || 'Không có tên'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {appointment.serviceName}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-gray-700">
                          {formatTime(appointment.appointmentDate)} - {formatDate(appointment.appointmentDate)}
                        </span>
                      </div>

                      {appointment.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-gray-500" />
                          <span className="text-gray-700">{appointment.phone}</span>
                        </div>
                      )}

                      {appointment.doctorName && (
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-500" />
                          <span className="text-gray-700">BS. {appointment.doctorName}</span>
                        </div>
                      )}

                      {appointment.description && (
                        <div className="md:col-span-2">
                          <p className="text-gray-600 text-sm">
                            <span className="font-medium">Ghi chú:</span> {appointment.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {showAppointments && todayAppointments.length === 0 && (
            <div className="px-6 pb-6 border-t">
              <div className="pt-4 text-center py-8 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Không có lịch hẹn nào hôm nay</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <button
          onClick={() => navigate("/staff/appointments")}
          className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition"
        >
          Quản lý lịch hẹn
        </button>
        <button
          onClick={() => navigate("/staff/listpatients")}
          className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition"
        >
          Quản lý bệnh nhân
        </button>
      </div>
    </div>
  );
}