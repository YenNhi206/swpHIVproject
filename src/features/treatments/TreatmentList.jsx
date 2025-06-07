import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TreatmentList() {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fakeData = [
      { id: 1, name: "TDF + 3TC + DTG", description: "Phác đồ chuẩn cho người lớn", category: "Người lớn" },
      { id: 2, name: "AZT + 3TC + EFV", description: "Phác đồ thay thế cho người lớn", category: "Người lớn" },
      { id: 3, name: "ABC + 3TC + LPV/r", description: "Phác đồ dành cho phụ nữ mang thai", category: "Phụ nữ mang thai" },
      { id: 4, name: "NVP + 3TC + AZT", description: "Phác đồ cho trẻ em", category: "Trẻ em" },
    ];

    setTreatments(fakeData); // Đổi thành [] nếu muốn test giao diện khi không có dữ liệu
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-600">Danh sách phác đồ điều trị HIV</h2>
        <Link
          to="/treatment/create"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          + Tạo phác đồ mới
        </Link>
      </div>

      <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Tên phác đồ</th>
            <th className="px-4 py-3 text-left">Mô tả</th>
            <th className="px-4 py-3 text-left">Đối tượng</th>
            <th className="px-4 py-3">Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {treatments.length > 0 ? (
            treatments.map((treatment) => (
              <tr key={treatment.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{treatment.name}</td>
                <td className="px-4 py-3">{treatment.description}</td>
                <td className="px-4 py-3">{treatment.category}</td>
                <td className="px-4 py-3 text-center">
                  <Link
                    to={`/treatment/${treatment.id}`}
                    className="inline-block px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                Không có phác đồ điều trị nào.
                <div className="mt-4">
                  <Link
                    to="/treatment/create"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    + Tạo phác đồ mới
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
