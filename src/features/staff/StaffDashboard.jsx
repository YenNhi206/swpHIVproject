import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);

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

        const today = new Date().toISOString().split("T")[0];
        const filteredAppointments = data.filter((a) =>
          a.appointmentDate?.startsWith(today)
        );
        setTodayAppointments(filteredAppointments);
      } catch (error) {
        console.error("Lỗi khi tải lịch hẹn:", error.message);
        setAppointments([]);
        setTodayAppointments([]);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-8">
        Trang Chủ Nhân Viên
      </h1>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 border-l-4 border-red-500">
          <Calendar size={32} className="text-red-500" />
          <div>
            <p className="text-gray-500">Lịch hẹn hôm nay</p>
            <p className="text-xl font-bold">{todayAppointments.length}</p>
          </div>
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