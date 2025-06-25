import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { User, Lock, Mail, Key } from 'lucide-react';

export default function LoginPage({ setUser }) {
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetStep, setResetStep] = useState('email');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleForgotEmailChange = (e) => {
    setForgotEmail(e.target.value);
    setErrors((prev) => ({ ...prev, forgotEmail: '' }));
  };

  const validateLoginForm = () => {
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

  const validateForgotEmailForm = () => {
    const newErrors = {};
    if (!forgotEmail) newErrors.forgotEmail = 'Email là bắt buộc';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail))
      newErrors.forgotEmail = 'Email không hợp lệ';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetPasswordForm = () => {
    const newErrors = {};
    if (!otp) newErrors.otp = 'OTP là bắt buộc';
    else if (!/^[A-Za-z0-9]{6}$/.test(otp)) newErrors.otp = 'OTP phải gồm 6 ký tự chữ và số';
    if (!newPassword) newErrors.newPassword = 'Mật khẩu mới là bắt buộc';
    else if (newPassword.length < 6) newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      const payload = {
        email: credentials.identifier,
        password: credentials.password,
      };
      console.log('Dữ liệu gửi tới /api/auth/login:', JSON.stringify(payload, null, 2));
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Lỗi từ /api/auth/login:', errorData);
          throw new Error(errorData.message || 'Thông tin đăng nhập không hợp lệ');
        }

        const data = await response.json();
        console.log('Phản hồi từ /api/auth/login:', data);
        if (data.message.includes('thành công')) {
          localStorage.setItem('user', JSON.stringify({
            fullName: data.fullName,
            role: data.role,
          }));
          setUser({ fullName: data.fullName, role: data.role });

          switch (data.role) {
            case 'DOCTOR':
              navigate('/doctor');
              break;
            case 'STAFF':
              navigate('/staff');
              break;
            case 'ADMIN':
              navigate('/admin');
              break;
            default:
              navigate('/');
          }
        } else {
          setErrors({ server: data.message || 'Đăng nhập thất bại' });
        }
      } catch (error) {
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
    if (validateForgotEmailForm()) {
      const payload = { email: forgotEmail };
      console.log('Dữ liệu gửi tới /api/auth/forgot-password:', JSON.stringify(payload, null, 2));
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Lỗi từ /api/auth/forgot-password:', errorData);
          throw new Error(errorData.message || 'Gửi yêu cầu thất bại');
        }

        const data = await response.json();
        setResetStep('otp');
        setErrors({});
        setMessage('Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra OTP.');
      } catch (error) {
        if (error.name === 'AbortError') {
          setErrors((prev) => ({ ...prev, forgotEmail: 'Yêu cầu quá thời gian' }));
        } else {
          setErrors((prev) => ({ ...prev, forgotEmail: error.message || 'Có lỗi xảy ra' }));
        }
      }
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (validateResetPasswordForm()) {
      const payload = { email: forgotEmail, newPassword, otp };
      console.log('Dữ liệu gửi tới /api/auth/reset-password-otp:', JSON.stringify(payload, null, 2));
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('http://localhost:8080/api/auth/reset-password-otp', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Lỗi từ /api/auth/reset-password-otp:', errorData);
          throw new Error(errorData.message || 'Đặt lại mật khẩu thất bại');
        }

        const data = await response.json();
        setSuccessMessage(data.message || 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập.');
        setIsModalOpen(false);
        setResetStep('email');
        setOtp('');
        setNewPassword('');
        setForgotEmail('');
        setErrors({});
      } catch (error) {
        if (error.name === 'AbortError') {
          setErrors((prev) => ({ ...prev, reset: 'Yêu cầu quá thời gian' }));
        } else {
          setErrors((prev) => ({ ...prev, reset: error.message || 'Có lỗi xảy ra' }));
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      <div className="flex items-center justify-center px-4 mt-4 mb-8">

        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 opacity-0 translate-y-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center flex items-center justify-center gap-2">

            <User className="w-6 h-6" />
            Đăng nhập
          </h2>
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Mail className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="text"
                  name="identifier"
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  placeholder="Email"
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
            <p
              className="text-sm text-red-600 text-center mt-2 cursor-pointer hover:underline"
              onClick={() => setIsModalOpen(true)}
            >
              Quên mật khẩu?
            </p>
            <p className="mt-4 text-center text-gray-600">
              Chưa có tài khoản?{' '}
              <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Dialog open={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setResetStep('email');
        setOtp('');
        setNewPassword('');
        setForgotEmail('');
        setErrors({});
        setSuccessMessage('');
      }} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-50">
            <Dialog.Title className="text-xl font-semibold mb-4 text-red-700">
              {resetStep === 'email' ? 'Lấy lại mật khẩu' : 'Xác minh OTP và đặt mật khẩu mới'}
            </Dialog.Title>
            {message && (
              <p className="text-green-600 text-sm mb-4">{message}</p>
            )}
            {resetStep === 'email' ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Nhập địa chỉ email để nhận OTP đặt lại mật khẩu.
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Mail className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="email"
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                      placeholder="Nhập email"
                      value={forgotEmail}
                      onChange={handleForgotEmailChange}
                    />
                  </div>
                  {errors.forgotEmail && (
                    <p className="text-red-600 text-sm mt-1">{errors.forgotEmail}</p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setResetStep('email');
                      setSuccessMessage('');
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Gửi OTP
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Nhập OTP từ email và mật khẩu mới.
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Key className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="text"
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                      placeholder="Nhập OTP (6 chữ số)"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  {errors.otp && (
                    <p className="text-red-600 text-sm mt-1">{errors.otp}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Lock className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="password"
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                      placeholder="Nhập mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setResetStep('email');
                      setOtp('');
                      setNewPassword('');
                      setForgotEmail('');
                      setSuccessMessage('');
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Đặt lại mật khẩu
                  </button>
                </div>
              </form>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}