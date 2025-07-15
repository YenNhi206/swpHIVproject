import React, { useState, useEffect } from 'react';

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const patientId = localStorage.getItem('patientId');
        const token = localStorage.getItem('token') || '';

        const res = await fetch(`http://localhost:8080/api/patients/${patientId}/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorBody = await res.json().catch(() => ({}));
          throw new Error(`Lỗi khi tải dữ liệu lịch sử: ${res.status} - ${errorBody.error || res.statusText}`);
        }

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (isLoading) return <p className="text-center text-red-400 mt-10 animate-pulse">Đang tải dữ liệu lịch sử...</p>;
  if (error) return <p className="text-center text-red-600 mt-10 font-semibold">{error}</p>;
  if (!history) return <p className="text-center text-red-500 mt-10 italic">Không có dữ liệu lịch sử.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans text-base text-gray-900">
      <h2 className="text-4xl font-extrabold mb-8 text-red-700 border-b-4 border-red-600 pb-2">
        Lịch sử khám &amp; điều trị
      </h2>

      {/* Cuộc hẹn */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-red-600 mb-4 border-l-4 border-red-500 pl-3">
          Cuộc hẹn (Appointments)
        </h3>
        {history.appointments && history.appointments.length > 0 ? (
          <ul className="space-y-4">
            {history.appointments.map((appt) => (
              <li
                key={appt.id}
                className="p-5 bg-red-50 border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <p><span className="font-semibold text-red-700">Ngày hẹn:</span> {appt.appointmentDate?.slice(0, 10)}</p>
                <p><span className="font-semibold text-red-700">Loại hẹn:</span> {appt.appointmentType || 'N/A'}</p>
                <p><span className="font-semibold text-red-700">Trạng thái:</span> {appt.status || 'N/A'}</p>
                <p><span className="font-semibold text-red-700">Ghi chú:</span> {appt.note || 'Không có'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-red-500">Không có lịch sử cuộc hẹn.</p>
        )}
      </section>

      {/* Kết quả xét nghiệm */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-red-600 mb-4 border-l-4 border-red-500 pl-3">
          Kết quả xét nghiệm
        </h3>
        {history.testResults && history.testResults.length > 0 ? (
          <ul className="space-y-4">
            {history.testResults.map((test) => (
              <li
                key={test.id}
                className="p-5 bg-red-50 border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <p><span className="font-semibold text-red-700">Ngày xét nghiệm:</span> {test.createdAt?.slice(0, 10)}</p>
                <p><span className="font-semibold text-red-700">Loại xét nghiệm:</span> {test.testCategoryName || 'N/A'}</p>
                <p><span className="font-semibold text-red-700">Kết quả:</span> {test.resultValue || 'N/A'}</p>
                <p><span className="font-semibold text-red-700">Ghi chú:</span> {test.resultNote || 'Không có'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-red-500">Không có kết quả xét nghiệm.</p>
        )}
      </section>

      {/* Đơn thuốc */}
      <section>
        <h3 className="text-2xl font-semibold text-red-600 mb-4 border-l-4 border-red-500 pl-3">
          Đơn thuốc
        </h3>
        {history.prescriptions && history.prescriptions.length > 0 ? (
          <ul className="space-y-4">
            {history.prescriptions.map((presc) => (
              <li
                key={presc.id}
                className="p-5 bg-red-50 border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <p><span className="font-semibold text-red-700">Ngày kê đơn:</span> {presc.prescribedDate?.slice(0, 10)}</p>
                <p><span className="font-semibold text-red-700">Phác đồ:</span> {presc.protocolName || 'N/A'}</p>
                <p><span className="font-semibold text-red-700">Trạng thái:</span> {presc.status || 'N/A'}</p>
                <p><span className="font-semibold text-red-700">Ghi chú:</span> {presc.note || 'Không có'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-red-500">Không có đơn thuốc.</p>
        )}
      </section>
    </div>
  );
}
