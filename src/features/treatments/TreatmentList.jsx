import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TreatmentList() {
  // Giả lập dữ liệu phác đồ điều trị
  
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    // Thay thế fetch API thực tế khi có backend
    const fakeData = [
      { id: 1, name: "TDF + 3TC + DTG", description: "Phác đồ chuẩn cho người lớn", category: "Người lớn" },
      { id: 2, name: "AZT + 3TC + EFV", description: "Phác đồ thay thế cho người lớn", category: "Người lớn" },
      { id: 3, name: "ABC + 3TC + LPV/r", description: "Phác đồ dành cho phụ nữ mang thai", category: "Phụ nữ mang thai" },
      { id: 4, name: "NVP + 3TC + AZT", description: "Phác đồ cho trẻ em", category: "Trẻ em" },
    ];

    setTreatments(fakeData);
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Danh sách phác đồ điều trị HIV</h2>

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
          {treatments.map((treatment) => (
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
          ))}

          {treatments.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                Không có phác đồ điều trị nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}