import React from "react";

export default function UserDetail({ user }) {
  if (!user) return <div>Không tìm thấy người dùng.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Chi tiết người dùng</h2>

      <div className="grid grid-cols-2 gap-4 text-gray-800 mb-6">
        <p><strong>Họ tên:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Số điện thoại:</strong> {user.phone}</p>
        <p><strong>Vai trò:</strong> {user.role}</p>
        <p><strong>Ngày sinh:</strong> {user.dob}</p>
        <p><strong>Giới tính:</strong> {user.gender}</p>
      </div>

      {user.role === "Doctor" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-500 mb-2">Thông tin bác sĩ</h3>
          <p><strong>Chuyên khoa:</strong> {user.specialty}</p>
          <p><strong>Kinh nghiệm:</strong> {user.experience} năm</p>
        </div>
      )}

      {user.role === "Patient" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-500 mb-2">Thông tin bệnh nhân</h3>
          <p><strong>Mã bệnh nhân:</strong> {user.patientId}</p>
          <p><strong>Tình trạng:</strong> {user.status}</p>
        </div>
      )}

      {user.role === "Staff" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-red-500 mb-2">Thông tin nhân viên</h3>
          <p><strong>Phòng ban:</strong> {user.department}</p>
          <p><strong>Chức vụ:</strong> {user.position}</p>
        </div>
      )}

      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
        onClick={() => window.history.back()}
      >
        Quay lại
      </button>
    </div>
  );
}