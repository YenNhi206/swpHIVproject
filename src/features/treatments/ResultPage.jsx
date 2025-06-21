import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, User, Stethoscope, Calendar } from 'lucide-react';

export default function ResultPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const determineStatus = (results) => {
    const cd4 = parseInt(results.find((r) => r.label === 'CD4').value);
    const viralLoad = results.find((r) => r.label === 'Tải lượng virus').value;
    if (cd4 > 500 && viralLoad === 'Không phát hiện') {
      return {
        status: 'Đáp ứng tốt',
        note: 'Bệnh nhân đáp ứng tốt với phác đồ hiện tại, tiếp tục theo dõi.',
      };
    }
    return {
      status: 'Không đáp ứng tốt',
      note: 'CD4 giảm nhanh, cần đánh giá lại phác đồ.',
    };
  };

  const result = {
    patientName: 'Nguyễn Văn A',
    doctorName: 'BS. Trần Thị B',
    testDate: '2025-05-20',
    results: [
      { label: 'CD4', value: '520 tế bào/mm³' },
      { label: 'Tải lượng virus', value: 'Không phát hiện' },
      { label: 'Chỉ số ALT', value: '25 U/L' },
    ],
    ...determineStatus([
      { label: 'CD4', value: '520 tế bào/mm³' },
      { label: 'Tải lượng virus', value: 'Không phát hiện' },
      { label: 'Chỉ số ALT', value: '25 U/L' },
    ]),
    technician: 'Nguyễn Thị Xét Nghiệm',
    currentRegimen: 'TDF + 3TC + DTG',
    assignedBy: 'BS. Lê Văn C',
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-600 mb-8 text-center">
          Kết quả điều trị
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
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
            <div className="space-y-8">
              {/* Thông tin cơ bản */}
              <section>
                <h2 className="text-2xl font-bold text-red-600 mb-4">Thông tin cơ bản</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <User className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">Bệnh nhân</p>
                      <p className="text-lg text-gray-800">{result.patientName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <Stethoscope className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">Bác sĩ phụ trách</p>
                      <p className="text-lg text-gray-800">{result.doctorName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase">Ngày xét nghiệm</p>
                      <p className="text-lg text-gray-800">{result.testDate}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Xét nghiệm thực hiện bởi:</p>
                  <p className="text-gray-800 font-medium">{result.technician}</p>
                </div>
              </section>

              {/* Phác đồ điều trị */}
              <section>
                <h2 className="text-2xl font-bold text-red-600 mb-4">Phác đồ điều trị</h2>
                {result.currentRegimen ? (
                  <div className="bg-gray-50 border-l-4 border-green-500 p-4 rounded-md">
                    <p className="text-gray-700">
                      Phác đồ hiện tại: <strong className="text-green-700">{result.currentRegimen}</strong>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Bác sĩ chỉ định: {result.assignedBy}</p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                    <p className="text-yellow-800 font-medium">
                      Chưa áp dụng phác đồ điều trị. Bác sĩ cần xem xét chỉ số để đưa ra phác đồ phù hợp.
                    </p>
                  </div>
                )}
              </section>

              {/* Kết quả xét nghiệm */}
              <section>
                <h2 className="text-2xl font-bold text-red-600 mb-4">Kết quả xét nghiệm</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {result.results.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-red-50 border border-red-100 p-4 rounded-xl text-center"
                    >
                      <p className="font-semibold text-red-600 text-lg">{item.label}</p>
                      <p className="text-xl font-bold text-gray-900 mt-2">{item.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Đánh giá tổng quan */}
              <section>
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
                {result.status !== 'Đáp ứng tốt' && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-3 text-red-700">
                    <p>Bệnh nhân không đáp ứng tốt với phác đồ hiện tại. Bác sĩ cần đánh giá lại và xem xét thay đổi điều trị.</p>
                  </div>
                )}
                <p className="text-gray-700">
                  <strong>Ghi chú:</strong> {result.note}
                </p>
              </section>

              {/* Hành động */}
              <section className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handlePrint}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                  In kết quả
                </button>
                <button
                  onClick={() => alert('Chức năng chia sẻ đang phát triển!')}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  Chia sẻ kết quả
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition"
                >
                  Quay lại
                </button>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}