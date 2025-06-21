import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail } from 'lucide-react';

export default function LoginPage({ setUser }) {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [forgotEmail, setForgotEmail] = useState('');
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
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleForgotChange = (e) => {
    setForgotEmail(e.target.value);
    setErrors((prev) => ({ ...prev, forgotEmail: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.identifier)
      newErrors.identifier = 'Email hoặc Họ tên là bắt buộc';
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.identifier) &&
      !credentials.identifier.match(/^[a-zA-Z\s]+$/)
    )
      newErrors.identifier = 'Email hoặc Họ tên không hợp lệ';
    if (!credentials.password)
      newErrors.password = 'Mật khẩu là bắt buộc';
    else if (credentials.password.length < 6)
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.identifier,
            password: credentials.password,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Thông tin đăng nhập không hợp lệ');
        }

        const data = await response.json();
        console.log('Phản hồi từ server:', data);
        if (data.message.includes('thành công')) {
          // Lưu user vào localStorage
          localStorage.setItem(
            'user',
            JSON.stringify({
              fullName: data.fullName,
              role: data.role,
            })
          );

          // Cập nhật user state ở App
          setUser({
            fullName: data.fullName,
            role: data.role,
          });

          // Điều hướng theo role
          if (data.role === 'DOCTOR') {
            navigate('/doctor');
          } else {
            navigate('/'); // hoặc trang success của user
          }
        } else {
          setErrors({ server: data.message || 'Đăng nhập thất bại' });
        }
      } catch (error) {
        console.error('Lỗi đăng nhập:', error.message);
        if (error.name === 'AbortError') {
          setErrors({ server: 'Yêu cầu quá thời gian' });
        } else {
          setErrors({ server: error.message || 'Có lỗi xảy ra' });
        }
      }
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrors((prev) => ({ ...prev, forgotEmail: 'Email là bắt buộc' }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setErrors((prev) => ({ ...prev, forgotEmail: 'Email không hợp lệ' }));
    } else {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(
          'http://localhost:8080/api/auth/forgot-password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: forgotEmail,
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gửi yêu cầu thất bại');
        }

        const data = await response.json();
        alert(data.message || 'Email đặt lại mật khẩu đã được gửi!');
      } catch (error) {
        console.error('Lỗi quên mật khẩu:', error.message);
        if (error.name === 'AbortError') {
          setErrors((prev) => ({ ...prev, forgotEmail: 'Yêu cầu quá thời gian' }));
        } else {
          setErrors((prev) => ({ ...prev, forgotEmail: error.message || 'Có lỗi xảy ra' }));
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 pt-8">

        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 opacity-0 translate-y-4 animate-fade-in">
          {/* Đăng nhập */}
          <div>
            <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              Đăng nhập
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email hoặc Họ và Tên
                </label>
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
                {errors.identifier && (
                  <p className="text-red-600 text-sm mt-1">{errors.identifier}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
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
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Đăng nhập
              </button>
              {errors.server && (
                <p className="text-red-600 text-center mt-2">{errors.server}</p>
              )}
              <p className="mt-4 text-center text-gray-600">
                Chưa có tài khoản?{' '}
                <Link
                  to="/signup"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
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
            <p className="text-sm text-gray-600 mb-4">
              Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.
            </p>
            <form onSubmit={handleForgotSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
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
                {errors.forgotEmail && (
                  <p className="text-red-600 text-sm mt-1">{errors.forgotEmail}</p>
                )}
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
