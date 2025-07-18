import React, { useState, useEffect } from "react";
import { Stethoscope } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Support() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "FEMALE",
    date: "",
    time: "", // Thêm trường này để chọn giờ
    problem: "",
    doctor: "", // Lưu tên bác sĩ
    service: "", // Lưu tên dịch vụ
    birthDate: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy danh sách bác sĩ
  useEffect(() => {
    fetch("http://localhost:8080/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        if (data?.content) setDoctors(data.content);
      })
      .catch(() => setError("Không thể tải danh sách bác sĩ."));
  }, []);

  // Lấy danh sách dịch vụ
  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => setError("Không thể tải danh sách dịch vụ."));
  }, []);

  // Lấy giờ trống khi chọn bác sĩ và ngày
  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      setAvailableTimeSlots([]);
      setFormData((prev) => ({ ...prev, time: "" })); // reset time khi đổi bác sĩ/ngày
      if (!formData.doctor || !formData.date) return;
      const selectedDoctor = doctors.find(
        (d) => d.fullName === formData.doctor
      );
      if (!selectedDoctor) return;
      try {
        const res = await fetch(
          `http://localhost:8080/api/doctors/${selectedDoctor.id}/schedules?date=${formData.date}`
        );
        const data = await res.json();
        setAvailableTimeSlots(data || []);
      } catch {
        setAvailableTimeSlots([]);
      }
    };
    fetchAvailableTimeSlots();
    // eslint-disable-next-line
  }, [formData.doctor, formData.date, doctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const selectedDoctor = doctors.find((d) => d.fullName === formData.doctor);
    const selectedService = services.find((s) => s.name === formData.service);

    if (!selectedDoctor || !selectedService) {
      setError("Vui lòng chọn dịch vụ và bác sĩ!");
      setIsLoading(false);
      return;
    }
    if (!formData.time) {
      setError("Vui lòng chọn giờ tư vấn!");
      setIsLoading(false);
      return;
    }

    // appointmentDate là ISO string từ slot đã chọn
    const appointmentDate = formData.time;

    const payload = {
      fullName: formData.name,
      email: formData.email,
      gender: formData.gender,
      phone: formData.phone,
      date: formData.date,
      description: formData.problem,
      aliasName: formData.name,
      birthDate: formData.birthDate,
      doctorId: selectedDoctor.id,
      serviceId: selectedService.id,
      appointmentDate,
    };

    try {
      const res = await fetch("http://localhost:8080/api/appointments/online", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response data:", data);
      if (!res.ok)
        throw new Error(data?.message || data?.error || "Đặt lịch thất bại");

      if (data.appointmentId) {
        // Nếu có appointmentId, lưu vào localStorage
        localStorage.setItem("appointmentId", data.appointmentId);
      }

      // Lấy giờ từ appointmentDate trả về
      const appointmentDateObj = new Date(
        data.appointmentDate || appointmentDate
      );
      const timeString = appointmentDateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      navigate("/payment", {
        state: {
          appointmentData: {
            doctorName: selectedDoctor.fullName,
            appointmentDate: appointmentDate,
            date: formData.date,
            time: timeString,
            anonymous: false,
            service: selectedService.name,
            price: selectedService.price,
          },
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Lấy giá dịch vụ đã chọn để hiển thị
  const selectedService = services.find((s) => s.name === formData.service);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2 justify-center">
            <Stethoscope className="w-6 h-6" /> Đặt lịch tư vấn
          </h1>

          {error && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}

          {/* Họ tên & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label>Họ tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Giới tính */}
          <div>
            <label>Giới tính</label>
            <div className="flex gap-4">
              {["FEMALE", "MALE", "OTHER"].map((value) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={value}
                    checked={formData.gender === value}
                    onChange={handleChange}
                  />
                  {value === "FEMALE"
                    ? "Nữ"
                    : value === "MALE"
                    ? "Nam"
                    : "Khác"}
                </label>
              ))}
            </div>
          </div>

          {/* Số điện thoại & Ngày */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày tư vấn
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={
                  new Date(new Date().setDate(new Date().getDate() + 1))
                    .toISOString()
                    .split("T")[0]
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Chọn giờ trống */}
          <div>
            <label>Giờ tư vấn</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
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

          {/* Ngày sinh (nếu cần) */}
          <div>
            <label>Ngày sinh</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Chọn dịch vụ */}
          <div>
            <label>Dịch vụ</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">-- Chọn dịch vụ --</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name} - {service.price?.toLocaleString()} VND
                </option>
              ))}
            </select>
            {selectedService && (
              <div className="text-green-600 font-bold mt-2">
                Giá tư vấn: {selectedService.price?.toLocaleString()} VND
              </div>
            )}
          </div>

          {/* Chọn bác sĩ */}
          <div>
            <label>Bác sĩ</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">-- Chọn bác sĩ --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.fullName}>
                  {doctor.fullName} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Vấn đề cần tư vấn */}
          <div>
            <label>Vấn đề cần tư vấn</label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 py-3 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              {isLoading ? "Đang gửi..." : "Xác nhận đặt lịch"}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Bạn muốn đặt lịch ẩn danh?{" "}
            <Link
              to="/anonymous-appointment"
              className="text-red-600 hover:underline"
            >
              Tại đây
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
