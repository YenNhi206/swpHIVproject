import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar as CalendarIcon, Mail, Phone, Clock, Stethoscope } from 'lucide-react';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    gender: '',
    service: '',
    doctor: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const doctors = ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B', 'Dr. Phạm Văn C'];
  const genderOptions = ['Nữ', 'Nam', 'Khác'];

  const firstVisitServices = [
    'Khám HIV cơ bản',
    'Xét nghiệm tải lượng virus HIV',
    'Xét nghiệm CD4',
    'Tư vấn và điều trị dự phòng',
  ];

  const followUpServices = [
    'Khám tái khám HIV',
    'Lấy thuốc ARV',
  ];

  const timeSlots = [
    { label: '08:00 - 09:00', value: '08:00' },
    { label: '09:00 - 10:00', value: '09:00' },
    { label: '10:00 - 11:00', value: '10:00' },
    { label: '11:00 - 12:00', value: '11:00' },
    { label: '13:00 - 14:00', value: '13:00' },
    { label: '14:00 - 15:00', value: '14:00' },
    { label: '15:00 - 16:00', value: '15:00' },
    { label: '16:00 - 17:00', value: '16:00' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Họ tên là bắt buộc';
    else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) newErrors.fullName = 'Họ tên chỉ chứa chữ cái';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
    else if (!/^\d{10,11}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
    if (!formData.dob) newErrors.dob = 'Ngày sinh là bắt buộc';
    if (!formData.date) newErrors.date = 'Ngày hẹn là bắt buộc';
    if (!formData.time) newErrors.time = 'Giờ hẹn là bắt buộc';
    if (!formData.gender) newErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.service) newErrors.service = 'Dịch vụ là bắt buộc';
    if (!formData.doctor) newErrors.doctor = 'Bác sĩ là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dữ liệu:', formData);
      navigate('/payment', { state: { appointmentData: formData } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10 opacity-0 translate-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
          <Stethoscope className="w-6 h-6" />
          Đặt lịch hẹn
        </h2>
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
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                />
              </div>
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
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
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                />
              </div>
              {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob}</p>}
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
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                />
              </div>
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
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
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                />
              </div>
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Giới tính */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
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
              {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
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
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                />
              </div>
              {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* Giờ hẹn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giờ hẹn</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Clock className="w-5 h-5 text-gray-400 mx-3" />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none appearance-none"
                  required
                >
                  <option value="">Chọn giờ</option>
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot.value}>{slot.label}</option>
                  ))}
                </select>
              </div>
              {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
            </div>

            {/* Dịch vụ và Bác sĩ cùng hàng */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500 relative z-10">
                <Stethoscope className="w-5 h-5 text-gray-400 mx-3" />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none appearance-none bg-white"
                  required
                >
                  <option value="">Chọn dịch vụ</option>
                  <optgroup label="Khám lần đầu">
                    {firstVisitServices.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Tái khám">
                    {followUpServices.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {errors.service && <p className="text-red-600 text-sm mt-1">{errors.service}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bác sĩ</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Stethoscope className="w-5 h-5 text-gray-400 mx-3" />
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none appearance-none"
                  required
                >
                  <option value="">Chọn bác sĩ</option>
                  {doctors.map((doctor, index) => (
                    <option key={index} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
              {errors.doctor && <p className="text-red-600 text-sm mt-1">{errors.doctor}</p>}
            </div>

          </div>

          {/* Nút bấm */}
          <div className="flex justify-between gap-6 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-white text-red-600 border border-red-600 px-4 py-3 rounded-lg hover:bg-red-50 transition"
            >
              ← Trở lại
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white border border-red-600 px-4 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Đặt lịch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
