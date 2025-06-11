import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, User, Stethoscope, Calendar } from 'lucide-react';

export default function ResultPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const result = {
    patientName: 'Nguyễn Văn A',
    doctorName: 'BS. Trần Thị B',
    testDate: '2025-05-20',
    results: [
      { label: 'CD4', value: '520 tế bào/mm³' },
      { label: 'Tải lượng virus', value: 'Không phát hiện' },
      { label: 'Chỉ số ALT', value: '25 U/L' },
    ],
    status: 'Đáp ứng tốt',
    note: 'Tiếp tục theo dõi và duy trì phác đồ hiện tại.',
  };

  // Giả lập loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 mb-8 text-center animate-fade-in">
          Kết quả điều trị
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.2s]">
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="bg-red-50 p-4 rounded-lg animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Thông tin cơ bản */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <User className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase">Bệnh nhân</p>
                    <p className="text-lg text-gray-800">{result.patientName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <Stethoscope className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase">Bác sĩ phụ trách</p>
                    <p className="text-lg text-gray-800">{result.doctorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase">Ngày xét nghiệm</p>
                    <p className="text-lg text-gray-800">{result.testDate}</p>
                  </div>
                </div>
              </div>

              {/* Chỉ số kết quả */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Chỉ số kết quả</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {result.results.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-red-50 border border-red-100 p-4 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow duration-300"
                    >
                      <p className="font-semibold text-red-600 text-lg">{item.label}</p>
                      <p className="text-xl font-bold text-gray-900 mt-2">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Đánh giá tổng quan */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Đánh giá tổng quan</h2>
                <div className="flex items-center gap-3 mb-3">
                  {result.status === 'Đáp ứng tốt' ? (
                    <CheckCircle className="text-green-600" size={28} />
                  ) : (
                    <AlertCircle className="text-yellow-500" size={28} />
                  )}
                  <p className="text-lg font-medium text-gray-800">
                    <strong>Trạng thái:</strong>{' '}
                    <span className={result.status === 'Đáp ứng tốt' ? 'text-green-600' : 'text-yellow-600'}>
                      {result.status}
                    </span>
                  </p>
                </div>
                <p className="text-gray-700">
                  <strong>Ghi chú:</strong> {result.note}
                </p>
              </div>

              {/* Nút hành động */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handlePrint}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors duration-300"
                >
                  In kết quả
                </button>
                <button
                  onClick={() => alert('Chức năng chia sẻ đang phát triển!')}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors duration-300"
                >
                  Chia sẻ kết quả
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors duration-300"
                >
                  Quay lại
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}