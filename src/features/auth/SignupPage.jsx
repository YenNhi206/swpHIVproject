import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Lock, AlertCircle } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

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
    if (!formData.fullName) newErrors.fullName = 'Họ tên là bắt buộc';
    else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) newErrors.fullName = 'Họ tên chỉ chứa chữ cái';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (formData.phone && !/^\d{10,11}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
    if (!formData.dob) newErrors.dob = 'Ngày sinh là bắt buộc';
    if (!formData.gender) newErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.address) newErrors.address = 'Địa chỉ là bắt buộc';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    else if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dữ liệu đăng ký:', formData);
      // Gửi API đăng ký ở đây
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">

      <div className="flex items-center justify-center flex-grow px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 opacity-0 translate-y-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center flex items-center justify-center gap-2">
            <User className="w-6 h-6" />
            Đăng ký tài khoản
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
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Calendar className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="date"
                    name="dob"
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                <div className="flex space-x-6 mt-1">
                  {["Nam", "Nữ", "Khác"].map((gender) => (
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Mail className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="text"
                    name="address"
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Lock className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Lock className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Đăng ký
            </button>

            <p className="mt-4 text-center text-gray-600">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
                Đăng nhập
              </Link>
            </p>
            <p className="text-sm text-gray-500 text-center mt-2">Thời gian: {currentDate}</p>
          </form>
        </div>
      </div>
    </div>
  );
}