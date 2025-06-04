import React from 'react';

export default function PatientProfile() {
  const userInfo = {
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    dob: '1990-01-01',
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    hivStatus: 'Dương tính',
    treatmentStartDate: '2018-06-01',
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Hồ sơ cá nhân</h2>
      <div className="space-y-4 text-gray-700">
        <ProfileField label="Họ tên" value={userInfo.name} />
        <ProfileField label="Giới tính" value={userInfo.gender} />
        <ProfileField label="Ngày sinh" value={userInfo.dob} />
        <ProfileField label="Số điện thoại" value={userInfo.phone} />
        <ProfileField label="Địa chỉ" value={userInfo.address} />
        <ProfileField label="Tình trạng HIV" value={userInfo.hivStatus} />
        <ProfileField label="Bắt đầu điều trị" value={userInfo.treatmentStartDate} />
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
