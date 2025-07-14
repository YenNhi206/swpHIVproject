import React, { useState, useEffect } from 'react';
import { Stethoscope } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Support() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'FEMALE',
    date: '',
    problem: '',
    doctorId: '',
  });

  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (data?.content) setDoctors(data.content);
      })
      .catch(() => setError('Không thể tải danh sách bác sĩ.'));
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
      fullName: formData.name,
      email: formData.email,
      gender: formData.gender,
      phone: formData.phone,
      date: formData.date,
      description: formData.problem,
      aliasName: formData.name,
      birthDate: '',
      doctorId: Number(formData.doctorId), // Sửa ở đây: convert sang số
    };

    try {
      const res = await fetch("http://localhost:8080/api/appointments/online", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Đặt lịch thất bại');


      const appointmentDate = new Date(data.appointmentDate);
      const timeString = !isNaN(appointmentDate)
        ? appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

      const selectedDoctor = doctors.find(d => d.id === Number(formData.doctorId));
      navigate('/payment', {
        state: {
          appointmentData: {
            doctor: selectedDoctor?.fullName || 'Không xác định',
            date: formData.date,
            time: timeString,
            anonymous: false,
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
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2 justify-center">
            <Stethoscope className="w-6 h-6" /> Đặt lịch tư vấn
          </h1>

          {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

          {/* Họ tên & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label>Họ tên</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
          </div>

          {/* Giới tính */}
          <div>
            <label>Giới tính</label>
            <div className="flex gap-4">
              {['FEMALE', 'MALE', 'OTHER'].map(value => (
                <label key={value} className="flex items-center gap-2">
                  <input type="radio" name="gender" value={value} checked={formData.gender === value} onChange={handleChange} />
                  {value === 'FEMALE' ? 'Nữ' : value === 'MALE' ? 'Nam' : 'Khác'}
                </label>
              ))}
            </div>
          </div>

          {/* Số điện thoại & Ngày */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label>Số điện thoại</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label>Ngày tư vấn</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
          </div>

          {/* Chọn bác sĩ */}
          <div>
            <label>Bác sĩ</label>
            <select name="doctorId" value={formData.doctorId} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">-- Chọn bác sĩ --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Vấn đề cần tư vấn */}
          <div>
            <label>Vấn đề cần tư vấn</label>
            <textarea name="problem" value={formData.problem} onChange={handleChange} rows="4" required className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 py-3 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              Hủy
            </button>
            <button type="submit" disabled={isLoading} className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition">
              {isLoading ? 'Đang gửi...' : 'Xác nhận đặt lịch'}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Bạn muốn đặt lịch ẩn danh? <Link to="/anonymous-appointment" className="text-red-600 hover:underline">Tại đây</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
