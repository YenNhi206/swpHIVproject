import React, { useEffect, useState } from "react";
import { Calendar, Users, AlertCircle, Plus, X } from "lucide-react";
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
    gender: 'Nữ',
    birthDate: '',
    appointmentDate: '',
    appointmentType: 'FIRST_VISIT',
    serviceId: '',
    doctorId: '',
    description: '',
    status: 'Chưa đến'
  });

  function InputField({ label, type = "text", value, onChange, ...props }) {
    return (
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2 rounded"
          {...props}
        />
      </div>
    );
  }

  function SelectField({ label, value, onChange, options }) {
    return (
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border p-2 rounded"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }


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

        setDoctors(Array.isArray(doctorData.content) ? doctorData.content : []);
        setServices(Array.isArray(serviceData.content) ? serviceData.content : []);
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

      {/* Danh sách lịch hẹn hôm nay */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-red-700">Lịch hẹn hôm nay</h2>
        {todayAppointments.length === 0 ? (
          <p>Không có lịch hẹn hôm nay.</p>
        ) : (
          <ul className="divide-y">
            {todayAppointments.slice(0, 5).map((a) => (
              <li key={a.id} className="py-2 flex justify-between items-center">
                <span>{a.fullName} - {a.appointmentDate?.slice(11, 16)}</span>
                <span className="text-sm text-gray-500">{a.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Các nút chức năng */}
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
      {showForm && (
        <div className="flex justify-center mt-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative animate-fade-in"
          >
            <button
              onClick={() => setShowForm(false)}
              type="button"
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold text-red-700 mb-4">Tạo lịch hẹn mới</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Họ tên */}
              <InputField label="Họ tên" value={newAppointment.fullName} onChange={(v) => setNewAppointment({ ...newAppointment, fullName: v })} />

              {/* Email */}
              <InputField label="Email" type="email" value={newAppointment.email} onChange={(v) => setNewAppointment({ ...newAppointment, email: v })} />

              {/* Số điện thoại */}
              <InputField label="Số điện thoại" value={newAppointment.phone} onChange={(v) => setNewAppointment({ ...newAppointment, phone: v })} />

              {/* Ngày sinh */}
              <InputField label="Ngày sinh" type="date" value={newAppointment.birthDate} onChange={(v) => setNewAppointment({ ...newAppointment, birthDate: v })} max={new Date().toISOString().split("T")[0]} />

              {/* Giới tính */}
              <SelectField label="Giới tính" value={newAppointment.gender} onChange={(v) => setNewAppointment({ ...newAppointment, gender: v })} options={["Nam", "Nữ", "Khác"]} />

              {/* Loại lịch hẹn */}
              <SelectField label="Loại lịch hẹn" value={newAppointment.appointmentType} onChange={(v) => setNewAppointment({ ...newAppointment, appointmentType: v })} options={["Khám lần đầu", "Tái khám"]} />

              {/* Dịch vụ */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Dịch vụ</label>
                <select
                  value={newAppointment.serviceId}
                  onChange={(e) => setNewAppointment({ ...newAppointment, serviceId: e.target.value })}
                  className="border p-2 rounded"
                  required
                >
                  <option value="">-- Chọn dịch vụ --</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bác sĩ */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-700 mb-1">Bác sĩ</label>
                <select
                  value={newAppointment.doctorId}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
                  className="border p-2 rounded"
                  required
                >
                  <option value="">-- Chọn bác sĩ --</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.fullName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ngày hẹn */}
              <InputField
                label="Ngày hẹn"
                type="date"
                min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                value={newAppointment.appointmentDate}
                onChange={(v) => setNewAppointment({ ...newAppointment, appointmentDate: v })}
              />

              {/* Giờ hẹn */}
              <InputField
                label="Giờ hẹn"
                type="time"
                value={newAppointment.appointmentTime}
                onChange={(v) => setNewAppointment({ ...newAppointment, appointmentTime: v })}
              />

              {/* Mô tả */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm text-gray-700 mb-1">Ghi chú</label>
                <textarea
                  placeholder="Nhập ghi chú nếu có"
                  value={newAppointment.description || ""}
                  onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                  className="border p-2 rounded"
                  rows={3}
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-2 justify-end">
              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Lưu
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}



    </div>
  );
}