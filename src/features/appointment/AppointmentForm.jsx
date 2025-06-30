import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Calendar as CalendarIcon, Mail, Phone, Stethoscope } from 'lucide-react';

export default function AppointmentForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { doctor: doctorFromState, availableTimeSlots: initialAvailableTimeSlots = [], defaultDate = '' } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    date: defaultDate,
    time: '',
    gender: '',
    visitType: '',
    service: '',
    doctor: doctorFromState ? doctorFromState.fullName : '',
  });

  const [availableTimeSlots, setAvailableTimeSlots] = useState(initialAvailableTimeSlots);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      if (!formData.date || !doctorFromState?.id) {
        setAvailableTimeSlots([]);
        return;
      }

      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if (!token) {
          setAvailableTimeSlots([]);
          return;
        }

        const res = await fetch(
          `http://localhost:8080/api/doctors/${doctorFromState.id}/schedule?date=${formData.date}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res.ok) throw new Error('Lỗi tải lịch trống');
        const data = await res.json();
        setAvailableTimeSlots(data.timeSlots || []);
        if (!data.timeSlots.includes(formData.time)) {
          setFormData((prev) => ({ ...prev, time: '' }));
        }
      } catch (error) {
        console.error(error);
        setAvailableTimeSlots([]);
      }
    };

    fetchAvailableTimeSlots();
  }, [formData.date, doctorFromState, formData.time]);

  const genderOptions = ['Nữ', 'Nam', 'Khác'];
  const firstVisitServices = [
    'Xét nghiệm nhanh HIV và STIs',
    'Dự phòng trước phơi nhiễm HIV – PrEP',
    'Dự phòng sau phơi nhiễm HIV – PEP',
    'Điều trị HIV – ARV',
  ];
  const followUpServices = ['Khám tái khám HIV', 'Lấy thuốc ARV'];

  const availableServices = formData.visitType === 'Khám lần đầu' ? firstVisitServices : followUpServices;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      service: name === 'visitType' ? '' : prev.service,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Họ tên là bắt buộc';
    else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) newErrors.fullName = 'Họ tên chỉ chứa chữ cái';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
    else if (!/^\d{10,11}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại phải có 10-11 chữ số';
    if (!formData.dob) newErrors.dob = 'Ngày sinh là bắt buộc';
    if (!formData.date) newErrors.date = 'Ngày hẹn là bắt buộc';
    if (!formData.time) newErrors.time = 'Giờ hẹn là bắt buộc';
    if (!formData.gender) newErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.visitType) newErrors.visitType = 'Vui lòng chọn loại khám';
    if (!formData.service) newErrors.service = 'Dịch vụ là bắt buộc';
    if (!formData.doctor) newErrors.doctor = 'Bác sĩ là bắt buộc';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dữ liệu:', formData);
      navigate('/payment', { state: { appointmentData: formData } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10 animate-fade-in">
        <h2 className="text-2xl font-bold text-red-700 mb-6 text-center flex items-center justify-center gap-2">
          <Stethoscope className="w-6 h-6" />
          Đặt lịch hẹn
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
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                />
              </div>
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
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
                />
              </div>
              {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Mail className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
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
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                />
              </div>
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
              <div className="flex space-x-6 mt-1">
                {genderOptions.map((gender) => (
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại khám</label>
              <div className="flex space-x-6 mt-1">
                {['Khám lần đầu', 'Tái khám'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="visitType"
                      value={type}
                      checked={formData.visitType === type}
                      onChange={handleChange}
                      className="mr-2 accent-red-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
              {errors.visitType && <p className="text-red-600 text-sm mt-1">{errors.visitType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">-- Chọn dịch vụ --</option>
                {availableServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && <p className="text-red-600 text-sm mt-1">{errors.service}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bác sĩ</label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              {errors.doctor && <p className="text-red-600 text-sm mt-1">{errors.doctor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hẹn</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giờ hẹn</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={availableTimeSlots.length === 0}
              >
                <option value="">{availableTimeSlots.length > 0 ? '-- Chọn giờ hẹn --' : 'Không có giờ trống'}</option>
                {availableTimeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Xác nhận đặt lịch
          </button>
        </form>
      </div>
    </div>
  );
}
