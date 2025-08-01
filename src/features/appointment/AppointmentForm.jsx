import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { doctor: doctorFromState, defaultDate = "" } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
    date: defaultDate || "",
    time: "",
    gender: "Nữ",
    visitType: "Khám lần đầu",
    service: "",
    doctor: doctorFromState ? doctorFromState.fullName : "",
    description: "",
  });

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        if (!token) return;

        const res = await fetch("http://localhost:8080/api/patients/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Không lấy được hồ sơ: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        console.log("Profile data:", data); // 👈 Kiểm tra structure

        setFormData((prev) => ({
          ...prev,
          fullName: data.fullName || "",
          phone: data.phone || "",
          email: data.email || "",
          dob: data.birthDate
            ? new Date(data.birthDate).toISOString().split("T")[0]
            : "",
          gender:
            data.gender === "MALE"
              ? "Nam"
              : data.gender === "FEMALE"
                ? "Nữ"
                : "Khác",
        }));
      } catch (err) {
        console.error("Lỗi khi lấy hồ sơ:", err);
      }
    };

    fetchProfile();
  }, []);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const res = await fetch("http://localhost:8080/api/doctors", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Lỗi tải danh sách bác sĩ");
        const data = await res.json();
        setDoctors(data.content || []);
      } catch (error) {
        console.error("Lỗi khi tải bác sĩ:", error);
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const type =
          formData.visitType === "Khám lần đầu" ? "FIRST_VISIT" : "FOLLOW_UP";
        const res = await fetch(`http://localhost:8080/api/services/type/${type}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(`Lỗi tải danh sách dịch vụ: ${res.status}`);
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Lỗi khi tải dịch vụ:", error);
        setServices([]);
      }
    };
    fetchServices();
  }, [formData.visitType]);

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      if (!formData.date || !formData.doctor) {
        setAvailableTimeSlots([]);
        return;
      }

      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        if (!token) return;

        const doctorObj = doctors.find((d) => d.fullName === formData.doctor);
        if (!doctorObj) return;

        const res = await fetch(
          `http://localhost:8080/api/doctors/${doctorObj.id}/schedules?date=${formData.date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Lỗi tải lịch trống");
        const data = await res.json();
        setAvailableTimeSlots(data || []);
        if (!data.some((slot) => slot.startTime === formData.time)) {
          setFormData((prev) => ({ ...prev, time: "" }));
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch trống:", error);
        setAvailableTimeSlots([]);
      }
    };
    fetchAvailableTimeSlots();
  }, [formData.date, formData.doctor, doctors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Họ tên là bắt buộc";
    else if (!/^[a-zA-ZÀ-ỹ\s]+$/i.test(formData.fullName))
      newErrors.fullName = "Họ tên chỉ chứa chữ cái";
    if (!formData.email) newErrors.email = "Email là bắt buộc";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email không hợp lệ";
    if (!formData.phone) newErrors.phone = "Số điện thoại là bắt buộc";
    else if (!/^\d{10,11}$/.test(formData.phone))
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
    if (!formData.dob) newErrors.dob = "Ngày sinh là bắt buộc";
    if (!formData.date) newErrors.date = "Ngày hẹn là bắt buộc";
    if (!formData.time) newErrors.time = "Giờ hẹn là bắt buộc";
    if (!formData.gender) newErrors.gender = "Giới tính là bắt buộc";
    if (!formData.visitType) newErrors.visitType = "Vui lòng chọn loại khám";
    if (!formData.service) newErrors.service = "Vui lòng chọn dịch vụ";
    if (!formData.doctor) newErrors.doctor = "Bác sĩ là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = localStorage.getItem("user");
    const token = JSON.parse(userData)?.token;

    if (!token) {
      setSubmitError("Vui lòng đăng nhập để đặt lịch.");
      navigate("/login", { state: { from: "/appointment-form" } });
      return;
    }

    try {
      const selectedDoctor = doctors.find((d) => d.fullName === formData.doctor);
      const selectedService = services.find((s) => s.name === formData.service);
      if (!selectedDoctor || !selectedService) {
        setSubmitError("Thông tin bác sĩ hoặc dịch vụ không hợp lệ");
        return;
      }

      const body = {
        doctorId: selectedDoctor.id,
        serviceId: selectedService.id,
        appointmentType:
          formData.visitType === "Khám lần đầu" ? "FIRST_VISIT" : "FOLLOW_UP",
        appointmentDate: formData.time,
        fullName: formData.fullName,
        phone: formData.phone,
        gender: formData.gender,
        description: formData.description || "",
        birthDate: formData.dob,
      };

      const response = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data?.appointment?.id) {
        localStorage.setItem("appointmentId", data.appointment.id);
        navigate("/payment", {
          state: {
            appointmentData: {
              doctorName: selectedDoctor.fullName,
              appointmentDate: formData.time,
              price: selectedService.price,
              anonymous: false,
            },
          },
        });
      } else {
        setSubmitError(data.error || data.message || "Đặt lịch thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setSubmitError("Có lỗi xảy ra khi đặt lịch");
    }
  };

  const renderInput = (label, name, type = "text", required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        max={type === "date" && name === "dob" ? new Date().toISOString().split("T")[0] : undefined}
      />
      {errors[name] && <p className="text-red-600 text-sm mt-1">{errors[name]}</p>}
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
        <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
          Đặt lịch hẹn
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput("Họ tên", "fullName")}
            {renderInput("Ngày sinh", "dob", "date")}
            {renderInput("Email", "email", "email")}
            {renderInput("Số điện thoại", "phone")}
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
              {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
            </div>

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
              {errors.visitType && (
                <p className="text-red-600 text-sm mt-1">{errors.visitType}</p>
              )}
            </div>

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
              {errors.service && (
                <p className="text-red-600 text-sm mt-1">{errors.service}</p>
              )}
            </div>

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
              {errors.doctor && (
                <p className="text-red-600 text-sm mt-1">{errors.doctor}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hẹn</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giờ hẹn</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={availableTimeSlots.length === 0}
              >
                <option value="">
                  {availableTimeSlots.length > 0
                    ? "-- Chọn giờ hẹn --"
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
              {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả (tuỳ chọn)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={3}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Xác nhận đặt lịch
          </button>
          {submitError && (
            <p className="text-red-600 text-sm mt-2 text-center">{submitError}</p>
          )}
        </form>
      </div>
    </div>
  );
}
