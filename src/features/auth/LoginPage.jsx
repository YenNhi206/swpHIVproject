import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Mail, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [forgotEmail, setForgotEmail] = useState('');

  // Ngày giờ hiện tại (03:13 PM +07, 13/06/2025)
  const currentDate = new Date('2025-06-13T15:13:00+07:00').toLocaleString('vi-VN', {
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
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleForgotChange = (e) => {
    setForgotEmail(e.target.value);
    setErrors((prev) => ({ ...prev, forgotEmail: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.identifier) newErrors.identifier = 'Email hoặc Họ tên là bắt buộc';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.identifier) && !credentials.identifier.match(/^[a-zA-Z\s]+$/))
      newErrors.identifier = 'Email hoặc Họ tên không hợp lệ';
    if (!credentials.password) newErrors.password = 'Mật khẩu là bắt buộc';
    else if (credentials.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Đăng nhập với:', credentials);
      // Gọi API đăng nhập ở đây
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrors((prev) => ({ ...prev, forgotEmail: 'Email là bắt buộc' }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setErrors((prev) => ({ ...prev, forgotEmail: 'Email không hợp lệ' }));
    } else {
      console.log('Gửi yêu cầu lấy lại mật khẩu với:', forgotEmail);
      // Gọi API quên mật khẩu ở đây
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      {/* Thanh điều hướng */}
      <div className="w-full bg-gray-200 py-4 px-6 text-lg mt-[-15px]">
        <Link to="/" className="text-black hover:text-red-600 font-normal">Trang chủ</Link>
        <span className="text-gray-500 px-1">{">>"}</span>
        <span className="font-bold">Tài khoản</span>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 translate-y-4 animate-fade-in">
          {/* Đăng nhập */}
          <div>
            <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              Đăng nhập
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email hoặc Họ và Tên</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Mail className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="text"
                    name="identifier"
                    required
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    placeholder="Email hoặc Họ tên"
                    value={credentials.identifier}
                    onChange={handleChange}
                  />
                </div>
                {errors.identifier && <p className="text-red-600 text-sm mt-1">{errors.identifier}</p>}
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
                    placeholder="Nhập mật khẩu"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Đăng nhập
              </button>
              <p className="mt-4 text-center text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
                  Đăng ký ngay
                </Link>
              </p>
              <p className="text-sm text-gray-500 text-center mt-2">
                Thời gian: {currentDate}
              </p>
            </form>
          </div>

          {/* Quên mật khẩu */}
          <div>
            <p className="text-sm text-gray-600 mb-4">Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.</p>
            <form onSubmit={handleForgotSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Mail className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="email"
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    placeholder="Nhập email"
                    value={forgotEmail}
                    onChange={handleForgotChange}
                  />
                </div>
                {errors.forgotEmail && <p className="text-red-600 text-sm mt-1">{errors.forgotEmail}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Lấy lại mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}