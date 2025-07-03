import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Clock, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
    problem: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const doctors = ['BS. Nguyễn Văn A', 'BS. Trần Thị B', 'BS. Lê Văn C'];

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
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Họ và tên là bắt buộc';
    if (!formData.email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = 'Email không hợp lệ';
    if (!formData.phone.match(/^\d{10,11}$/))
      newErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
    if (!formData.date) newErrors.date = 'Ngày là bắt buộc';
    if (!formData.time) newErrors.time = 'Giờ là bắt buộc';
    if (!formData.doctor) newErrors.doctor = 'Vui lòng chọn bác sĩ';
    if (!formData.problem.trim()) newErrors.problem = 'Vui lòng mô tả vấn đề cần khám';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log('Tư vấn:', formData);
      setIsLoading(false);
      navigate('/payment', { state: { appointmentData: formData } });

    }, 1000);
  };
  const genderOptions = ['Nữ', 'Nam', 'Khác'];

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      doctor: '',
      problem: '',
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      <div className="flex items-center justify-center px-4 mt-4 mb-8 w-full">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center flex items-center justify-center gap-2">
            <Stethoscope className="w-6 h-6" />

            Đặt lịch tư vấn trực tuyến về HIV
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Họ và tên & Email */}
            <div className="flex gap-x-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-600 mb-1">Họ và tên</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <User className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                  />
                </div>
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Mail className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                  />
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
              <div className="flex gap-6">
                {genderOptions.map((gender) => (
                  <label
                    key={gender}
                    className="inline-flex items-center cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="form-radio text-red-600"
                      required
                    />
                    <span className="ml-2">{gender}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
            </div>

            <div className="flex gap-x-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-600 mb-1">Số điện thoại</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Phone className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                  />
                </div>
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hẹn</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Calendar className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                  />
                </div>
                {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
              </div>
            </div>


            {/* Vấn đề sức khỏe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vấn đề sức khỏe</label>
              <textarea
                name="problem"
                placeholder="Mô tả vấn đề bạn đang gặp phải"
                value={formData.problem}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
              {errors.problem && <p className="text-red-600 text-sm mt-1">{errors.problem}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Đang xử lý...' : 'Đặt lịch tư vấn'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 border border-red-600 text-red-600 font-semibold py-3 rounded-lg hover:bg-red-100 transition-colors duration-300"
              >
                Hủy
              </button>
            </div>

            <div className="text-sm text-center mt-4">
              <span>Bạn muốn đặt lịch ẩn danh? </span>
              <a href="/anonymous-appointment" className="text-red-600 hover:underline">Đặt lịch ẩn danh tại đây</a>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
}
