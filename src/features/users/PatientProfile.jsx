import React, { useState, useEffect } from 'react';
import {
  User, Calendar, Phone, MapPin, Biohazard, Pill, Edit, Save,
} from 'lucide-react';
import { message } from 'antd';

const genderDisplayMap = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác',
  Nam: 'Nam',
  Nữ: 'Nữ',
  Khác: 'Khác',
};

const genderValueMap = {
  Nam: 'MALE',
  Nữ: 'FEMALE',
  Khác: 'OTHER',
};

function normalizeGender(gender) {
  if (!gender) return 'Khác';
  const g = gender.trim().toUpperCase();
  switch (g) {
    case 'MALE':
    case 'NAM':
      return 'Nam';
    case 'FEMALE':
    case 'NỮ':
      return 'Nữ';
    case 'OTHER':
    case 'KHÁC':
      return 'Khác';
    default:
      return genderDisplayMap[gender.trim()] || 'Khác';
  }
}

export default function PatientProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    gender: 'Khác',
    birthDate: '',
    phone: '',
    address: '',
    hivStatus: '',
    treatmentStartDate: '',
  });

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      try {
        const res = await fetch('http://localhost:8080/api/patients/profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Lỗi khi lấy hồ sơ');
        const data = await res.json();

        setUserInfo({
          fullName: data.fullName || '',
          gender: normalizeGender(data.gender),
          birthDate: data.birthDate ? data.birthDate.slice(0, 10) : '',
          phone: data.phone || '',
          address: data.address || '',
          hivStatus: data.hivStatus || '',
          treatmentStartDate: data.treatmentStartDate ? data.treatmentStartDate.slice(0, 10) : '',
        });
      } catch (error) {
        message.error('Không thể tải hồ sơ bệnh nhân');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const payload = {
      ...userInfo,
      gender: genderValueMap[userInfo.gender] || 'OTHER',
    };
    try {
      const res = await fetch('http://localhost:8080/api/patients/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Lỗi khi cập nhật hồ sơ');
      const data = await res.json();

      setUserInfo({
        fullName: data.fullName || '',
        gender: normalizeGender(data.gender),
        birthDate: data.birthDate ? data.birthDate.slice(0, 10) : '',
        phone: data.phone || '',
        address: data.address || '',
        hivStatus: data.hivStatus || '',
        treatmentStartDate: data.treatmentStartDate ? data.treatmentStartDate.slice(0, 10) : '',
      });
      message.success('Hồ sơ đã được lưu thành công!');
      setIsEditing(false);
    } catch (error) {
      message.error('Không thể cập nhật hồ sơ');
      console.error(error);
    }
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
                name="fullName"
                value={userInfo.fullName}
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
                type="select"
                options={[
                  { value: 'Nữ', label: 'Nữ' },
                  { value: 'Nam', label: 'Nam' },
                  { value: 'Khác', label: 'Khác' },
                ]}
              />
              <ProfileField
                label="Ngày sinh"
                name="birthDate"
                value={userInfo.birthDate}
                icon={<Calendar className="w-5 h-5 text-red-500" />}
                isEditing={isEditing}
                onChange={handleChange}
                type="date"
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
                isEditing={false}
              />
              <ProfileField
                label="Bắt đầu điều trị"
                name="treatmentStartDate"
                value={userInfo.treatmentStartDate}
                icon={<Pill className="w-5 h-5 text-red-500" />}
                isEditing={isEditing}
                onChange={handleChange}
                type="date"
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

function ProfileField({ label, name, value, icon, isEditing, onChange, type = 'text', options = [] }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
      {icon}
      <div className="w-full">
        <span className="block text-sm font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </span>
        {isEditing && name ? (
          type === 'select' ? (
            <select
              name={name}
              value={value}
              onChange={onChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )
        ) : (
          <span className="text-lg text-gray-800">
            {type === 'date' && value ? value.slice(0, 10) : value}
          </span>
        )}
      </div>
    </div>
  );
}
