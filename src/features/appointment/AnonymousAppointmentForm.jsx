import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Stethoscope, Clock, AlertCircle } from 'lucide-react';

export default function AnonymousAppointmentForm() {
  const [formData, setFormData] = useState({
    gender: '',
    reason: '',
    date: '',
    time: '',
    doctor: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleString('vi-VN', {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour12: false,
});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.gender) newErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.reason) newErrors.reason = 'Vấn đề cần khám là bắt buộc';
    else if (formData.reason.length < 10) newErrors.reason = 'Vui lòng nhập chi tiết hơn (ít nhất 10 ký tự)';
    if (!formData.date) newErrors.date = 'Ngày hẹn là bắt buộc';
    if (!formData.time) newErrors.time = 'Giờ hẹn là bắt buộc';
    if (!formData.doctor) newErrors.doctor = 'Bác sĩ là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit = {
        ...formData,
        anonymous: true,
      };
      console.log('Đặt lịch ẩn danh:', dataToSubmit);
      navigate('/payment', { state: { appointmentData: dataToSubmit } });
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
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 opacity-0 translate-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
          <Stethoscope className="w-6 h-6" />
          Đặt lịch tư vấn ẩn danh
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
              <AlertCircle className="w-5 h-5 text-gray-400 mx-3" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border-none rounded-lg focus:outline-none appearance-none"
                required
              >
                <option value="">Chọn giới tính</option>
                {genderOptions.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
            {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
          </div>

          <div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hẹn</label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
              <Calendar className="w-5 h-5 text-gray-400 mx-3" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border-none rounded-lg focus:outline-none"
                required
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

          <p className="text-sm text-gray-500 text-center mt-2">Thời gian: {currentDate}</p>
        </form>
      </div>
    </div>
  );
}