import React, { useState, useEffect } from 'react';
import { User, Calendar, Phone, MapPin, Biohazard, Pill, Edit, Save } from 'lucide-react';

export default function PatientProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    dob: '1990-01-01',
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    hivStatus: 'Dương tính',
    treatmentStartDate: '2018-06-01',
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Hồ sơ đã được lưu thành công!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center animate-fade-in">
          Hồ sơ cá nhân
        </h2>
        <div className="bg-white rounded-2xl shadow-lg p-8 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.2s]">
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <ProfileField
                label="Họ tên"
                name="name"
                value={userInfo.name}
                icon={<User className="w-5 h-5 text-red-500" />}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Giới tính"
                name="gender"
                value={userInfo.gender}
                icon={<User className="w-5 h-5 text-red-500" />}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Ngày sinh"
                name="dob"
                value={userInfo.dob}
                icon={<Calendar className="w-5 h-5 text-red-500" />}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Số điện thoại"
                name="phone"
                value={userInfo.phone}
                icon={<Phone className="w-5 h-5 text-red-500" />}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Địa chỉ"
                name="address"
                value={userInfo.address}
                icon={<MapPin className="w-5 h-5 text-red-500" />}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Tình trạng HIV"
                value={userInfo.hivStatus}
                icon={<Biohazard className="w-5 h-5 text-red-500" />}
                isEditing={false} // luôn không edit
              />
              <ProfileField
                label="Bắt đầu điều trị"
                name="treatmentStartDate"
                value={userInfo.treatmentStartDate}
                icon={<Pill className="w-5 h-5 text-red-500" />}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="mt-8 flex justify-center">
            {!isEditing ? (
              <button
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium flex items-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-5 h-5" />
                Chỉnh sửa hồ sơ
              </button>
            ) : (
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium flex items-center gap-2"
                onClick={handleSave}
              >
                <Save className="w-5 h-5" />
                Lưu thay đổi
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, name, value, icon, isEditing, onChange }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
      {icon}
      <div className="w-full">
        <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </span>
        {isEditing && name ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        ) : (
          <span className="text-lg text-gray-800">{value}</span>
        )}
      </div>
    </div>
  );
}
