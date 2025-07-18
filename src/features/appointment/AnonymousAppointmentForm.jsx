import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, Calendar as CalendarIcon } from "lucide-react";

export default function AnonymousAppointmentForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aliasName: "",
    gender: "FEMALE",
    description: "",
    date: "",
    time: "",
    birthDate: "",
    doctorId: "",
    phone: "",
    serviceId: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Lấy danh sách bác sĩ
  useEffect(() => {
    fetch("http://localhost:8080/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        const list = data.content || [];
        setDoctors(list);
      })
      .catch(() => setError("Không thể tải danh sách bác sĩ"));
  }, []);

  // Lấy danh sách dịch vụ
  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => setError("Không thể tải danh sách dịch vụ"));
  }, []);

  // Lấy giờ trống khi chọn bác sĩ và ngày
  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      setAvailableTimeSlots([]);
      setFormData((prev) => ({ ...prev, time: "" })); // reset time khi đổi bác sĩ/ngày
      if (!formData.doctorId || !formData.date) return;
      try {
        const res = await fetch(
          `http://localhost:8080/api/doctors/${formData.doctorId}/schedules?date=${formData.date}`
        );
        const data = await res.json();
        setAvailableTimeSlots(data || []);
      } catch {
        setAvailableTimeSlots([]);
      }
    };
    fetchAvailableTimeSlots();
    // eslint-disable-next-line
  }, [formData.doctorId, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.time) {
      setError("Vui lòng chọn giờ tư vấn!");
      setIsLoading(false);
      return;
    }
    if (!formData.serviceId) {
      setError("Vui lòng chọn dịch vụ!");
      setIsLoading(false);
      return;
    }

    const payload = {
      aliasName: formData.aliasName.trim(),
      gender: formData.gender,
      description: formData.description.trim(),
      date: formData.date,
      birthDate: formData.birthDate?.trim() ? formData.birthDate : null,
      doctorId: formData.doctorId ? Number(formData.doctorId) : null,
      phone: formData.phone.trim(),
      appointmentDate: formData.time, // ISO string từ slot đã chọn
      serviceId: formData.serviceId ? Number(formData.serviceId) : null,
    };

    try {
      const res = await fetch(
        "http://localhost:8080/api/appointments/anonymous-online",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;
      console.log("Response status:", res);
      if (data.appointmentId) {
        localStorage.setItem("appointmentId", data.appointmentId);
      }
      console.log("Response data:", data);

      if (!res.ok) throw new Error(data?.error || "Đặt lịch thất bại");

      const selectedDoctor = doctors.find(
        (d) => d.id === Number(formData.doctorId)
      );
      const selectedService = services.find(
        (s) => s.id === Number(formData.serviceId)
      );
      const appointmentDate = data.appointmentDate || formData.time;

      navigate("/payment", {
        state: {
          appointmentData: {
            doctorName: selectedDoctor?.fullName,
            appointmentDate: appointmentDate,
            price: selectedService?.price,
            anonymous: true,
          },
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-red-700 flex items-center gap-2 justify-center">
            <Stethoscope className="w-6 h-6" /> Đặt lịch ẩn danh
          </h1>

          {error && (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          )}

          <div>
            <label>Tên gọi</label>
            <input
              type="text"
              name="aliasName"
              value={formData.aliasName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
              placeholder="Nhập tên gọi"
              required
            />
          </div>

          <div>
            <label>Giới tính</label>
            <div className="flex items-center gap-4 mt-1">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  checked={formData.gender === "FEMALE"}
                  onChange={handleChange}
                />
                Nữ
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  checked={formData.gender === "MALE"}
                  onChange={handleChange}
                />
                Nam
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="OTHER"
                  checked={formData.gender === "OTHER"}
                  onChange={handleChange}
                />
                Khác
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày sinh
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <CalendarIcon className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày tư vấn
            </label>
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label>Chọn dịch vụ</label>
            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
              required
            >
              <option value="">-- Chọn dịch vụ --</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - {service.price?.toLocaleString()} VND
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Chọn bác sĩ</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
              required
            >
              <option value="">-- Chọn bác sĩ --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName} ({doctor.specialization})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Giờ tư vấn</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-200 rounded-lg"
              disabled={availableTimeSlots.length === 0}
            >
              <option value="">
                {availableTimeSlots.length > 0
                  ? "-- Chọn giờ trống --"
                  : "Không có giờ trống"}
              </option>
              {availableTimeSlots.map((slot) => (
                <option key={slot.id} value={slot.startTime}>
                  {new Date(slot.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Lý do cần tư vấn</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
              rows={4}
              placeholder="Nhập nội dung cần tư vấn..."
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 py-3 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              Trở lại
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              {isLoading ? "Đang gửi..." : "Xác nhận đặt lịch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
