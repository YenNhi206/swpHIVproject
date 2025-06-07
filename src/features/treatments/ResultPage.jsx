import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ResultPage() {
  const navigate = useNavigate();

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
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-extrabold text-red-700 mb-6 text-center">Kết quả điều trị</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <p className="font-semibold text-gray-600">Bệnh nhân</p>
          <p className="text-lg text-gray-800">{result.patientName}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <p className="font-semibold text-gray-600">Bác sĩ phụ trách</p>
          <p className="text-lg text-gray-800">{result.doctorName}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <p className="font-semibold text-gray-600">Ngày xét nghiệm</p>
          <p className="text-lg text-gray-800">{result.testDate}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Chỉ số kết quả</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {result.results.map((item, idx) => (
            <div
              key={idx}
              className="bg-red-50 border border-red-200 p-4 rounded-lg shadow text-center"
            >
              <p className="font-semibold text-red-600 text-lg">{item.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-2">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Đánh giá tổng quan</h2>
        <div className="flex items-center space-x-3 mb-2">
          {result.status === "Đáp ứng tốt" ? (
            <CheckCircle className="text-green-600" size={28} />
          ) : (
            <AlertCircle className="text-yellow-500" size={28} />
          )}
          <p className="text-lg font-medium text-gray-800">
            <strong>Trạng thái:</strong>{" "}
            <span className="text-green-600">{result.status}</span>
          </p>
        </div>
        <p className="text-gray-700"><strong>Ghi chú:</strong> {result.note}</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition">
          In kết quả
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
