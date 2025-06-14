import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar as CalendarIcon, Mail, Phone, Clock, Stethoscope, AlertCircle } from 'lucide-react';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
    doctor: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Ngày giờ hiện tại (03:31 PM +07, 13/06/2025)
  const currentDate = new Date('2025-06-13T15:31:00+07:00').toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleAnonymousChange = (e) => {
    if (e.target.checked) {
      navigate('/anonymous-appointment');
    }
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
    if (!formData.reason) newErrors.reason = 'Lý do khám là bắt buộc';
    if (!formData.doctor) newErrors.doctor = 'Bác sĩ là bắt buộc';
    if (!formData.gender) newErrors.gender = 'Giới tính là bắt buộc';
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

  const doctors = ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B', 'Dr. Phạm Văn C'];
  const genderOptions = ['Nam', 'Nữ', 'Khác'];
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 opacity-0 translate-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
          <Stethoscope className="w-6 h-6" />
          Đặt lịch hẹn
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <User className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <CalendarIcon className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="date"
                  name="dob"
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Mail className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Phone className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hẹn</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <CalendarIcon className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
            </div>

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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vấn đề cần khám</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Stethoscope className="w-5 h-5 text-gray-400 mx-3" />
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none resize-none h-24"
                  required
                />
              </div>
              {errors.reason && <p className="text-red-600 text-sm mt-1">{errors.reason}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chọn bác sĩ</label>
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

          <div className="flex justify-between gap-6 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-white text-red-600 border border-red-600 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors duration-300"
            >
              ← Trở lại
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white border border-red-600 px-4 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Đặt lịch
            </button>
          </div>
            <div className="text-sm text-center mt-4">
                    <span>Bạn muốn đặt lịch ẩn danh? </span>
                    <a href="/anonymous-appointment" className="text-red-600 hover:underline">Đặt lịch ẩn danh tại đây</a>
                </div>

          <p className="text-sm text-gray-500 text-center mt-2">Thời gian: {currentDate}</p>
        </form>
      </div>
    </div>
  );
}