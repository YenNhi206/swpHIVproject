import React, { useState} from 'react';
import { User, Mail, Phone, Calendar, Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Họ và tên là bắt buộc';
    if (!formData.email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = 'Email không hợp lệ';
    if (!formData.phone.match(/^\d{10,11}$/))
      newErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
    if (!formData.date) newErrors.date = 'Ngày là bắt buộc';
    if (!formData.time) newErrors.time = 'Giờ là bắt buộc';
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
      setSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', date: '', time: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-8 text-center animate-fade-in">
          Đặt lịch tư vấn trực tuyến về HIV
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.2s]">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : !submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Họ và tên
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <User className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    required
                  />
                </div>
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Mail className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Số điện thoại
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Phone className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    required
                  />
                </div>
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Ngày tư vấn
                  </label>
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

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Giờ tư vấn
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Clock className="w-5 h-5 text-gray-400 mx-3" />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full p-3 border-none rounded-lg focus:outline-none appearance-none"
                      required
                    >
                      <option value="" disabled>Chọn giờ</option>
                      {['10:00 - 11:00', '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00'].map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
                </div>
              </div>

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
          ) : (
            <div className="text-center bg-green-100 p-6 rounded-lg animate-fade-in [animation-delay:0.4s]">
              <p className="font-semibold text-lg text-green-700">
                Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.
              </p>
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Đặt lịch khác
                </button>
                <Link
                  to="/"
                  className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300"
                >
                  Quay lại trang chủ
                </Link>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}