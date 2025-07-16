import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Calendar as CalendarIcon,
  Mail,
  Phone,
  Stethoscope,
} from "lucide-react";


export default function AppointmentForm() {
  const navigate = useNavigate();
  const location = useLocation();


  // Nếu có truyền doctor và lịch trống, ngày mặc định từ trang trước
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
  const [services, setServices] = useState([]); // services = [{id, name}, ...]
  const [doctors, setDoctors] = useState([]); // doctors = [{id, fullName, ...}, ...]
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");


  // Fetch danh sách bác sĩ 1 lần khi load form
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


  // Fetch dịch vụ theo loại khám (visitType)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const type =
          formData.visitType === "Khám lần đầu" ? "FIRST_VISIT" : "FOLLOW_UP";
        const res = await fetch(
          `http://localhost:8080/api/services/type/${type}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok)
          throw new Error(`Lỗi tải danh sách dịch vụ: ${res.status}`);
        const data = await res.json();
        setServices(data); // data là mảng {id, name, ...}
      } catch (error) {
        console.error("Lỗi khi tải dịch vụ:", error);
        setServices([]);
      }
    };
    fetchServices();
  }, [formData.visitType]);


  // Fetch lịch trống khi date hoặc bác sĩ thay đổi
  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      if (!formData.date || !formData.doctor) {
        setAvailableTimeSlots([]);
        return;
      }


      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        if (!token) {
          setAvailableTimeSlots([]);
          return;
        }


        // Lấy id bác sĩ theo tên fullName
        const doctorObj = doctors.find((d) => d.fullName === formData.doctor);
        if (!doctorObj) {
          setAvailableTimeSlots([]);
          return;
        }


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
        // Nếu time hiện tại không còn trong slot, reset time
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


  const genderOptions = ["Nữ", "Nam", "Khác"];


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


    // Lấy token từ localStorage
    const userData = localStorage.getItem("user");
    let token = null;
    try {
      token = JSON.parse(userData)?.token;
    } catch {
      token = null;
    }
    console.log("Token gửi lên:", token);


    if (!token) {
      setSubmitError("Vui lòng đăng nhập để đặt lịch.");
      navigate("/login", { state: { from: "/appointment-form" } });
      return;
    }


    try {
      // Lấy object thay vì chỉ tên
      const selectedDoctor = doctors.find(
        (d) => d.fullName === formData.doctor
      );
      const selectedService = services.find((s) => s.name === formData.service);
      if (!selectedDoctor) {
        setSubmitError("Bác sĩ không hợp lệ");
        return;
      }
      if (!selectedService) {
        setSubmitError("Dịch vụ không hợp lệ");
        return;
      }


      // Lấy đúng ISO string cho appointmentDate
      const appointmentDate = formData.time; // slot.startTime đã là ISO string


      const body = {
        doctorId: Number(selectedDoctor.id),
        serviceId: Number(selectedService.id),
        appointmentType:
          formData.visitType === "Khám lần đầu" ? "FIRST_VISIT" : "FOLLOW_UP",
        appointmentDate: appointmentDate,
        fullName: formData.fullName,
        phone: formData.phone,
        gender: formData.gender,
        description: formData.description || "",
        birthDate: formData.dob,
      };
      // KHÔNG gửi email nếu backend không yêu cầu


      console.log("Body gửi lên:", JSON.stringify(body, null, 2));


      const response = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("Headers gửi lên:", {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });


      const data = await response.json();
      if (response.ok) {
        navigate("/payment", {
          state: {
            appointmentData: {
              doctorName: selectedDoctor.fullName,
              appointmentDate: appointmentDate,
              price: selectedService.price,
              anonymous: false, // hoặc true nếu có hỗ trợ đặt lịch ẩn danh
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


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10 animate-fade-in">
        <h2 className="text-2xl font-bold text-red-700 mb-6 text-center flex items-center justify-center gap-2">
          <Stethoscope className="w-6 h-6" />
          Đặt lịch hẹn
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Họ tên */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ tên
              </label>
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
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>


            {/* Ngày sinh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày sinh
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
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
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>


            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
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
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>


            {/* Giới tính */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới tính
              </label>
              <div className="flex space-x-6 mt-1">
                {genderOptions.map((gender) => (
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
              {errors.gender && (
                <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
              )}
            </div>


            {/* Loại khám */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại khám
              </label>
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


            {/* Dịch vụ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dịch vụ
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">-- Chọn dịch vụ --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-600 text-sm mt-1">{errors.service}</p>
              )}
            </div>


            {/* Bác sĩ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bác sĩ
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">-- Chọn bác sĩ --</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.fullName}>
                    {doctor.fullName}
                  </option>
                ))}
              </select>
              {errors.doctor && (
                <p className="text-red-600 text-sm mt-1">{errors.doctor}</p>
              )}
            </div>


            {/* Ngày hẹn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày hẹn
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={
                  new Date(Date.now() + 86400000).toISOString().split("T")[0]
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.date && (
                <p className="text-red-600 text-sm mt-1">{errors.date}</p>
              )}
            </div>


            {/* Giờ hẹn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giờ hẹn
              </label>
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
              {errors.time && (
                <p className="text-red-600 text-sm mt-1">{errors.time}</p>
              )}
            </div>


            {/* Mô tả */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả (tuỳ chọn)
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
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
            <p className="text-red-600 text-sm mt-2 text-center">
              {submitError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}



