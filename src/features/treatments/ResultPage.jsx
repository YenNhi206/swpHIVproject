import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
     const navigate = useNavigate(); // dùng để điều hướng trang
  // Giả lập dữ liệu
  const result = {
    patientName: "Nguyễn Văn A",
    doctorName: "BS. Trần Thị B",
    testDate: "2025-05-20",
    results: [
      { label: "CD4", value: "520 tế bào/mm³" },
      { label: "Tải lượng virus", value: "Không phát hiện" },
      { label: "Chỉ số ALT", value: "25 U/L" },
    ],
    status: "Đáp ứng tốt",
    note: "Tiếp tục theo dõi và duy trì phác đồ hiện tại.",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-red-700 mb-4">Kết quả điều trị</h1>
      <p><strong>Bệnh nhân:</strong> {result.patientName}</p>
      <p><strong>Bác sĩ phụ trách:</strong> {result.doctorName}</p>
      <p><strong>Ngày xét nghiệm:</strong> {result.testDate}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Chỉ số kết quả</h2>
        <ul className="list-disc list-inside text-gray-700">
          {result.results.map((item, idx) => (
            <li key={idx}>
              <strong>{item.label}:</strong> {item.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p><strong>Trạng thái:</strong> <span className="text-green-600">{result.status}</span></p>
        <p className="mt-2 text-gray-700"><strong>Ghi chú:</strong> {result.note}</p>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">In kết quả</button>
         <button
          onClick={() => navigate("/")}
          className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-100"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
