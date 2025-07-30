import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Key } from 'lucide-react';
import { Modal, message } from 'antd';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [forgotStep, setForgotStep] = useState('input');
  const [forgotData, setForgotData] = useState({ email: '', newPassword: '', otp: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleForgotChange = (e) =>
    setForgotData({ ...forgotData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Đăng nhập thất bại');
      navigate('/');
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotData.email || !forgotData.newPassword) {
      return message.warning('Vui lòng nhập đầy đủ Email và mật khẩu mới');
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotData.email,
          newPassword: forgotData.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gửi OTP thất bại');
      message.success('OTP đã được gửi đến email!');
      setForgotStep('otp');
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!forgotData.otp) {
      return message.warning('Vui lòng nhập mã OTP');
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/auth/reset-password-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotData.email,
          otp: forgotData.otp,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Xác minh OTP thất bại');
      message.success('Mật khẩu đã được đặt lại!');
      setModalVisible(false);
      setForgotStep('input');
      setForgotData({ email: '', newPassword: '', otp: '' });
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      <div className="flex items-center justify-center px-4 mt-4 mb-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center flex items-center justify-center gap-2">
            <Lock className="w-6 h-6" />
            Đăng nhập
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Mail className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
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
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <button
                type="button"
                onClick={() => setModalVisible(true)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Chưa có tài khoản?{' '}
            <a href="/signup" className="text-red-600 hover:text-red-700 font-medium">
              Đăng ký
            </a>
          </p>
        </div>
      </div>

      <Modal
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setForgotStep('input');
        }}
        footer={null}
        title="Khôi phục mật khẩu"
      >
        {forgotStep === 'input' ? (
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={forgotData.email}
                onChange={handleForgotChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
              <input
                type="password"
                name="newPassword"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={forgotData.newPassword}
                onChange={handleForgotChange}
              />
            </div>
            <button
              onClick={handleForgotPassword}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Gửi OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã OTP</label>
              <input
                type="text"
                name="otp"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={forgotData.otp}
                onChange={handleForgotChange}
              />
            </div>
            <button
              type="primary"
              block
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Xác nhận OTP
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
