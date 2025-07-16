import React, { useEffect, useState } from "react";
import { Calendar, Users, AlertCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    fullName: '',
    phone: '',
    gender: 'Nam',
    birthDate: '',
    appointmentDate: '',
    appointmentType: 'FIRST_VISIT',
    serviceId: '',
    doctorId: '',
    description: '',
    status: 'Chưa đến'
  });

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
      } catch (error) {
        console.error("Lỗi khi tải lịch hẹn:", error.message);
        setAppointments([]);
      }
    };

    const fetchDoctorsAndServices = async () => {
      const token = localStorage.getItem("token");
      try {
        const [docRes, serRes] = await Promise.all([
          fetch("http://localhost:8080/api/doctors", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:8080/api/services", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const doctorData = await docRes.json();
        const serviceData = await serRes.json();

        setDoctors(Array.isArray(doctorData) ? doctorData : []);
        setServices(Array.isArray(serviceData) ? serviceData : []);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu bác sĩ/dịch vụ:", err);
        setDoctors([]);
        setServices([]);
      }
    };

    fetchAppointments();
    fetchDoctorsAndServices();
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter(a => a.appointmentDate?.startsWith(today));
  const arrived = todayAppointments.filter(a => a.status === "Đã đến").length;
  const notArrived = todayAppointments.filter(a => a.status === "Chưa đến").length;
  const absent = todayAppointments.filter(a => a.status === "Vắng").length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newAppointment)
      });
      if (!res.ok) throw new Error("Thêm lịch hẹn thất bại");
      const created = await res.json();
      setAppointments([...appointments, created]);
      setShowForm(false);
      setNewAppointment({
        fullName: '', phone: '', gender: 'Nam', birthDate: '',
        appointmentDate: '', appointmentType: 'FIRST_VISIT',
        serviceId: '', doctorId: '', description: '', status: 'Chưa đến'
      });
    } catch (err) {
      alert(err.message);
    }
  };

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


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition"
        >
          Thêm lịch hẹn
        </button>
      </div>



      {/* Form thêm lịch hẹn */}
      {
        showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="text-lg font-semibold text-red-700 mb-4">Tạo lịch hẹn mới</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Họ tên" value={newAppointment.fullName} onChange={(e) => setNewAppointment({ ...newAppointment, fullName: e.target.value })} className="border p-2 rounded" required />
              <input type="text" placeholder="Số điện thoại" value={newAppointment.phone} onChange={(e) => setNewAppointment({ ...newAppointment, phone: e.target.value })} className="border p-2 rounded" required />
              <select value={newAppointment.gender} onChange={(e) => setNewAppointment({ ...newAppointment, gender: e.target.value })} className="border p-2 rounded">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
              <input type="date" placeholder="Ngày sinh" value={newAppointment.birthDate} onChange={(e) => setNewAppointment({ ...newAppointment, birthDate: e.target.value })} className="border p-2 rounded" />
              <input type="datetime-local" placeholder="Ngày hẹn" value={newAppointment.appointmentDate} onChange={(e) => setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })} className="border p-2 rounded" required />
              <select value={newAppointment.appointmentType} onChange={(e) => setNewAppointment({ ...newAppointment, appointmentType: e.target.value })} className="border p-2 rounded">
                <option value="FIRST_VISIT">Khám lần đầu</option>
                <option value="FOLLOW_UP">Tái khám</option>
              </select>
              <select value={newAppointment.serviceId} onChange={(e) => setNewAppointment({ ...newAppointment, serviceId: e.target.value })} className="border p-2 rounded" required>
                <option value="">-- Chọn dịch vụ --</option>
                {Array.isArray(services) && services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <select value={newAppointment.doctorId} onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })} className="border p-2 rounded" required>
                <option value="">-- Chọn bác sĩ --</option>
                {Array.isArray(doctors) && doctors.map(d => <option key={d.id} value={d.id}>{d.fullName}</option>)}
              </select>
              <textarea placeholder="Ghi chú" value={newAppointment.description} onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })} className="border p-2 rounded col-span-1 md:col-span-2"></textarea>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Lưu</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Hủy</button>
            </div>
          </form>
        )
      }

    </div >
  );
}