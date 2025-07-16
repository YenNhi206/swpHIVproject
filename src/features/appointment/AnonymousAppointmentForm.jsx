import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { Calendar as CalendarIcon } from "lucide-react";

export default function AnonymousAppointmentForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aliasName: '',
    gender: 'FEMALE',
    description: '',
    date: '',
    birthDate: '',
    doctorId: '',
    phone: '',
  });

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(res => res.json())
      .then(data => {
        const list = data.content || [];
        setDoctors(list);
      })
      .catch(() => setError('Không thể tải danh sách bác sĩ'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const payload = {
      aliasName: formData.aliasName.trim(),
      gender: formData.gender,
      description: formData.description.trim(),
      date: formData.date,
      birthDate: formData.birthDate?.trim() ? formData.birthDate : null,
      doctorId: formData.doctorId ? Number(formData.doctorId) : null,
      phone: formData.phone.trim(),
    };

    console.log('Payload gửi lên:', payload);

    try {
      const res = await fetch('http://localhost:8080/api/appointments/anonymous-online', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) throw new Error(data?.error || 'Đặt lịch thất bại');

      navigate('/payment', {
        state: {
          appointmentData: {
            doctor: doctors.find(d => d.id === Number(formData.doctorId))?.fullName,
            date: formData.date,
            time: '',
            anonymous: true,
          },
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-red-700 flex items-center gap-2 justify-center">
            <Stethoscope className="w-6 h-6" /> Đặt lịch ẩn danh
          </h1>

          {error && <p className="text-red-600 font-semibold text-center">{error}</p>}

          <div>
            <label>Tên gọi</label>
            <input
              type="text"
              name="aliasName"
              value={formData.aliasName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
              placeholder="Nhập tên gọi"
              required
            />
          </div>

          <div>
            <label>Giới tính</label>
            <div className="flex items-center gap-4 mt-1">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="FEMALE"
                  checked={formData.gender === 'FEMALE'}
                  onChange={handleChange}
                />
                Nữ
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="MALE"
                  checked={formData.gender === 'MALE'}
                  onChange={handleChange}
                />
                Nam
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="OTHER"
                  checked={formData.gender === 'OTHER'}
                  onChange={handleChange}
                />
                Khác
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày tư vấn</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg"
                min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Ngày mai
              />
            </div>

            <div>
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
              <CalendarIcon className="w-5 h-5 text-gray-400 mx-3" />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-3 border-none rounded-lg focus:outline-none"
                max={new Date().toISOString().split("T")[0]} // Chỉ cho phép chọn đến hôm nay
              />
            </div>
          </div>

          <div>
            <label>Chọn bác sĩ</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
              required
            >
              <option value="">-- Chọn bác sĩ --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName} ({doctor.specialization})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Lý do cần tư vấn</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg"
              rows={4}
              placeholder="Nhập nội dung cần tư vấn..."
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 py-3 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              Trở lại
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              {isLoading ? 'Đang gửi...' : 'Xác nhận đặt lịch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
