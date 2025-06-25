import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Stethoscope, Clock, AlertCircle, User, Phone } from 'lucide-react';

export default function AnonymousAppointmentForm() {
  const [formData, setFormData] = useState({
    salutation: '', // Danh xưng
    gender: '',
    reason: '',
    date: '',
    time: '',
    doctor: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.salutation) newErrors.salutation = 'Vui lòng chọn danh xưng';
    if (!formData.gender) newErrors.gender = 'Giới tính là bắt buộc';
    if (!formData.reason) newErrors.reason = 'Vấn đề cần khám là bắt buộc';
    else if (formData.reason.length < 10) newErrors.reason = 'Vui lòng nhập chi tiết hơn (ít nhất 10 ký tự)';
    if (!formData.phone) newErrors.phone = 'Số điện thoại là bắt buộc';
    else if (!/^[0-9]{9,11}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại không hợp lệ';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit = {
        ...formData,
        anonymous: true,
      };
      console.log('Đặt lịch ẩn danh:', dataToSubmit);
      navigate('/payment', { state: { appointmentData: dataToSubmit } });
    }
  };

  const genderOptions = ['Nữ', 'Nam', 'Khác'];


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 opacity-0 translate-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-red-700 mb-6 text-center flex items-center justify-center gap-2">

          <Stethoscope className="w-6 h-6" />
          Đặt lịch tư vấn trực tuyến ẩn danh
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            {/* Tên gọi */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên gọi</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <User className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="text"
                  name="salutation"
                  value={formData.salutation}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                />
              </div>
              {errors.salutation && <p className="text-red-600 text-sm mt-1">{errors.salutation}</p>}
            </div>

            {/* Số điện thoại */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Phone className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                />
              </div>

            </div>
          </div>



          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
            <div className="flex gap-6">
              {genderOptions.map((gender) => (
                <label
                  key={gender}
                  className="inline-flex items-center cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="form-radio text-red-600"
                    required
                  />
                  <span className="ml-2">{gender}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
          </div>



          {/* Vấn đề cần tư vấn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả vấn đề cần tư vấn</label>
            <textarea
              name="reason"
              placeholder="Ví dụ: Tôi cần tư vấn về việc điều trị HIV..."
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>
            {errors.reason && <p className="text-red-600 text-sm mt-1">{errors.reason}</p>}
          </div>

          {/* Nút thao tác */}
          <div className="flex justify-between gap-6 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-white text-red-600 border border-red-600 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors duration-300"
            >
              ← Trở lại
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white border border-red-600 px-4 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Đặt lịch
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
