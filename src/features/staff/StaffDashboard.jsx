import React, { useEffect, useState } from "react";
import { Calendar, Users, AlertCircle, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar as CalendarIcon } from "lucide-react";


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

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };



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

      {/* Form thêm lịch hẹn - Popup đẹp */}
      {showForm && (
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Thêm lịch hẹn</h2>

            {/* Nút đóng */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>


            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Họ tên */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <User className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Ngày sinh */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <CalendarIcon className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                      max={new Date().toISOString().split("T")[0]} // Chỉ cho phép chọn đến hôm nay
                    />
                  </div>
                </div>


                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Mail className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Phone className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Giới tính */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                  <div className="flex space-x-6 mt-1">
                    {["Nữ", "Nam", "Khác"].map((gender) => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={formData.gender === gender}
                          onChange={handleChange}
                          className="mr-2 accent-red-500"
                        />
                        {gender}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Loại khám */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại khám</label>
                  <div className="flex space-x-6 mt-1">
                    {["Khám lần đầu", "Tái khám"].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="visitType"
                          value={type}
                          checked={formData.visitType === type}
                          onChange={handleChange}
                          className="mr-2 accent-red-500"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Dịch vụ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bác sĩ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bác sĩ</label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">-- Chọn bác sĩ --</option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.fullName}>
                        {d.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ngày hẹn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hẹn</label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <CalendarIcon className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                      min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // ngày mai
                    />
                  </div>
                </div>


                {/* Giờ hẹn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giờ hẹn</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">-- Chọn khung giờ --</option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot.startTime} value={slot.startTime}>
                        {new Date(slot.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ghi chú */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ghi chú thêm (nếu có)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  ></textarea>
                </div>
              </div>

              {/* Nút submit */}
              <div className="flex justify-end mt-6 gap-2">
                <button type="submit" className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700">
                  Lưu
                </button>
                <button type="button" onClick={() => navigate(-1)} className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}