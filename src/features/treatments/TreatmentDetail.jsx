import React from "react";
import { useNavigate } from "react-router-dom";
export default function TreatmentDetail({ treatment }) {
    const navigate = useNavigate();
  // treatment là object chứa dữ liệu liệu trình
  return (
    
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-red-700 mb-4">{treatment.name}</h1>
      <p className="text-gray-700 mb-2"><strong>Mục đích:</strong> {treatment.purpose}</p>
      <p className="text-gray-600 mb-6">{treatment.description}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-red-600 mb-3">Danh sách thuốc</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-red-100">
              <th className="border border-gray-300 p-2 text-left">Tên thuốc</th>
              <th className="border border-gray-300 p-2 text-left">Liều lượng</th>
              <th className="border border-gray-300 p-2 text-left">Cách dùng</th>
              <th className="border border-gray-300 p-2 text-left">Thời gian</th>
              <th className="border border-gray-300 p-2 text-left">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {treatment.medications.map((med, idx) => (
              <tr key={idx} className="even:bg-gray-50">
                <td className="border border-gray-300 p-2">{med.name}</td>
                <td className="border border-gray-300 p-2">{med.dosage}</td>
                <td className="border border-gray-300 p-2">{med.usage}</td>
                <td className="border border-gray-300 p-2">{med.time}</td>
                <td className="border border-gray-300 p-2">{med.note || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-red-600 mb-3">Tác dụng phụ & Lưu ý</h2>
        <ul className="list-disc list-inside text-gray-700">
          {treatment.sideEffects.map((effect, idx) => (
            <li key={idx}>{effect}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-red-600 mb-3">Theo dõi hiệu quả</h2>
        <p className="text-gray-700">{treatment.monitoring}</p>
      </section>

       <div className="flex gap-4">
        <button className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">Chỉnh sửa liệu trình</button>
        <button
          className="px-4 py-2 border border-red-600 text-red-600 rounded-xl hover:bg-red-50"
          onClick={() => navigate('/treatments')}
        >
          Quay lại
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300">Xuất PDF</button>
      </div>
    </div>
    
  );
}