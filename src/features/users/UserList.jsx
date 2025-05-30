import React from "react";
import { useNavigate } from "react-router-dom";

const dummyUsers = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    email: "a@example.com",
    role: "Doctor",
    phone: "0901234567",
    dob: "1985-06-15",
    gender: "Nam",
    specialty: "Truyền nhiễm",
    experience: 10,
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    email: "b@example.com",
    role: "Patient",
    phone: "0912345678",
    dob: "1992-04-20",
    gender: "Nữ",
    patientId: "PAT1001",
    status: "Đang điều trị",
  },
  {
    id: 3,
    fullName: "Phạm Văn C",
    email: "c@example.com",
    role: "Staff",
    phone: "0923456789",
    dob: "1980-01-10",
    gender: "Nam",
    department: "Hành chính",
    position: "Nhân viên",
  },
];

export default function UserList() {
  const navigate = useNavigate();

  const handleViewDetail = (user) => {
    navigate(`/users/:id${user.id}`, { state: { user } });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Danh sách người dùng</h2>
      <table className="w-full border border-gray-300 table-auto">
        <thead className="bg-red-100">
          <tr>
            <th className="border p-2">Họ tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Vai trò</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user) => (
            <tr key={user.id} className="even:bg-gray-50">
              <td className="border p-2">{user.fullName}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleViewDetail(user)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}