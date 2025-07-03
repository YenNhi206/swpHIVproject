import React, { useEffect, useState } from "react";
import { Calendar, Users, ClipboardList, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter(a => a.date === today);
  const arrived = todayAppointments.filter(a => a.status === "Đã đến").length;
  const notArrived = todayAppointments.filter(a => a.status === "Chưa đến").length;
  const absent = todayAppointments.filter(a => a.status === "Vắng").length;

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-8">Trang Chủ Nhân Viên</h1>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 border-l-4 border-red-500">
          <Calendar size={32} className="text-red-500" />
          <div>
            <p className="text-gray-500">Lịch hẹn hôm nay</p>
            <p className="text-xl font-bold">{todayAppointments.length}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 border-l-4 border-green-500">
          <Users size={32} className="text-green-500" />
          <div>
            <p className="text-gray-500">Đã đến</p>
            <p className="text-xl font-bold">{arrived}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 border-l-4 border-yellow-500">
          <AlertCircle size={32} className="text-yellow-500" />
          <div>
            <p className="text-gray-500">Chưa đến / Vắng</p>
            <p className="text-xl font-bold">{notArrived + absent}</p>
          </div>
        </div>
      </div>

      {/* Danh sách lịch hẹn hôm nay */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-red-700">Lịch hẹn hôm nay</h2>
        {todayAppointments.length === 0 ? (
          <p>Không có lịch hẹn hôm nay.</p>
        ) : (
          <ul className="divide-y">
            {todayAppointments.slice(0, 5).map((a) => (
              <li key={a.id} className="py-2 flex justify-between items-center">
                <span>{a.fullName} - {a.time}</span>
                <span className="text-sm text-gray-500">{a.status}</span>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => navigate("/staff/appointments")}
          className="mt-4 text-red-600 hover:underline"
        >
          Xem tất cả
        </button>
      </div>

      {/* Lối tắt nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/staff/appointments")}
          className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition"
        >
          Quản lý lịch hẹn
        </button>
        <button
          onClick={() => navigate("/staff/patient-list")}
          className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition"
        >
          Quản lý bệnh nhân
        </button>
        <button
          onClick={() => navigate("/staff/appointments")}
          className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition"
        >
          Thêm lịch hẹn
        </button>
      </div>
    </div>
  );
}
