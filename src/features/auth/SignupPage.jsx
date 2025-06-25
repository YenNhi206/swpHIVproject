import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Key } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isOtpStep, setIsOtpStep] = useState(false); // Trạng thái để chuyển sang bước OTP
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Họ tên là bắt buộc';
    else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) newErrors.fullName = 'Họ tên chỉ chứa chữ cái';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    else if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtpForm = () => {
    const newErrors = {};
    if (!formData.otp) {
      newErrors.otp = 'OTP là bắt buộc';
    } else if (!/^[A-Z0-9]{6}$/.test(formData.otp)) {
      newErrors.otp = 'OTP phải gồm 6 ký tự chữ in hoa và số';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (validateRegisterForm()) {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      console.log('Dữ liệu gửi tới /api/auth/register:', payload); // Log dữ liệu
      try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage('Đăng ký thành công! Vui lòng nhập OTP được gửi đến email.');
          setIsOtpStep(true);
        } else {
          setMessage(data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        }
      } catch (error) {
        setMessage('Lỗi kết nối. Vui lòng thử lại.');
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (validateOtpForm()) {
      const payload = {
        email: formData.email,
        otp: formData.otp,
      };
      console.log('Dữ liệu gửi tới /api/auth/register-verify-otp:', payload); // Log dữ liệu
      try {
        const response = await fetch('http://localhost:8080/api/auth/register-verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (response.ok) {
          setMessage('Xác minh OTP thành công! Tài khoản đã được kích hoạt.');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setMessage(data.message || 'Xác minh OTP thất bại. Vui lòng thử lại.');
        }
      } catch (error) {
        setMessage('Lỗi kết nối. Vui lòng thử lại.');
      }
    }
  };

  const handleResendOtp = async () => {
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    console.log('Dữ liệu gửi tới /api/auth/register (gửi lại OTP):', payload); // Log dữ liệu
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('OTP mới đã được gửi đến email của bạn.');
      } else {
        setMessage(data.message || 'Gửi lại OTP thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      setMessage('Lỗi kết nối. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      <div className="flex items-center justify-center flex-grow px-4 mt-[-100px]">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 opacity-0 translate-y-4 animate-fade-in">

          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center flex items-center justify-center gap-2">
            {isOtpStep ? (
              <>
                <Key className="w-6 h-6" />
                Xác minh OTP
              </>
            ) : (
              <>
                <User className="w-6 h-6" />
                Đăng ký tài khoản
              </>
            )}
          </h2>
          {message && (
            <p className={`text-center mb-4 ${message.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
          {!isOtpStep ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
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

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Đăng ký
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Mail className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full p-3 border-none rounded-lg focus:outline-none bg-gray-100"
                    value={formData.email}
                    readOnly
                  />
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã OTP</label>
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                  <Key className="w-5 h-5 text-gray-400 mx-3" />
                  <input
                    type="text"
                    name="otp"
                    required
                    className="w-full p-3 border-none rounded-lg focus:outline-none"
                    value={formData.otp}
                    onChange={handleChange}
                  />
                </div>
                {errors.otp && <p className="text-red-600 text-sm mt-1">{errors.otp}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Xác minh OTP
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 mt-2"
              >
                Gửi lại OTP
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}