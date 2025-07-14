import React, { useEffect, useState, useMemo } from "react";

export default function History({ patientId }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/patients/${patientId}/history`);
        if (!response.ok) {
          throw new Error("Lỗi khi tải dữ liệu lịch sử");
        }
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [patientId]);

  const availableYears = useMemo(() => {
    const years = new Set();
    if (history) {
      [...history.appointments, ...history.testResults, ...history.prescriptions].forEach((item) => {
        const date = item.appointmentDate || item.createdAt || item.prescribedDate;
        if (date) years.add(new Date(date).getFullYear());
      });
    }
    return Array.from(years).sort((a, b) => b - a);
  }, [history]);

  const filterByYearAndSearch = (items, dateKey) => {
    return items
      .filter(item => {
        const year = new Date(item[dateKey]).getFullYear();
        return year === selectedYear;
      })
      .filter(item => {
        const search = searchInput.toLowerCase().trim();
        return (
          !search ||
          Object.values(item).some((value) =>
            typeof value === "string" && value.toLowerCase().includes(search)
          )
        );
      })
      .sort((a, b) => new Date(b[dateKey]) - new Date(a[dateKey]));
  };

  if (loading) return <p className="text-gray-500 italic">Đang tải dữ liệu...</p>;
  if (!history) return <p className="text-red-500">Không thể tải lịch sử bệnh nhân.</p>;

  const appointments = filterByYearAndSearch(history.appointments || [], "appointmentDate");
  const testResults = filterByYearAndSearch(history.testResults || [], "createdAt");
  const prescriptions = filterByYearAndSearch(history.prescriptions || [], "prescribedDate");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">Lịch sử khám & điều trị</h1>

      <div className="flex flex-wrap gap-6 mb-6 items-end">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Chọn năm</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block mb-1 text-sm font-medium text-gray-700">Tìm kiếm</label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Tìm theo từ khóa..."
            className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
          />
        </div>
      </div>

      {/* Appointments */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-blue-600">Lịch hẹn</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500 italic">Không có lịch hẹn phù hợp.</p>
        ) : (
          appointments.map((a) => (
            <div key={a.id} className="bg-gray-50 border rounded p-4 mb-3 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <strong>{a.serviceName}</strong>
                <span className="text-sm text-gray-500">
                  {new Date(a.appointmentDate).toLocaleString("vi-VN")}
                </span>
              </div>
              <p className="text-sm text-gray-700">{a.description || "Không có mô tả"}</p>
              <p className="text-xs text-gray-500">Trạng thái: {a.status}</p>
            </div>
          ))
        )}
      </section>

      {/* Test Results */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-green-600">Kết quả xét nghiệm</h2>
        {testResults.length === 0 ? (
          <p className="text-gray-500 italic">Không có kết quả xét nghiệm phù hợp.</p>
        ) : (
          testResults.map((t) => (
            <div key={t.id} className="bg-gray-50 border rounded p-4 mb-3 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <strong>{t.testName}</strong>
                <span className="text-sm text-gray-500">
                  {new Date(t.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <p className="text-sm text-gray-700">{t.result || "Chưa có kết quả"}</p>
              <p className="text-xs text-gray-500">Trạng thái: {t.status}</p>
            </div>
          ))
        )}
      </section>

      {/* Prescriptions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3 text-purple-600">Đơn thuốc</h2>
        {prescriptions.length === 0 ? (
          <p className="text-gray-500 italic">Không có đơn thuốc phù hợp.</p>
        ) : (
          prescriptions.map((p) => (
            <div key={p.id} className="bg-gray-50 border rounded p-4 mb-3 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <strong>Mã đơn: {p.id}</strong>
                <span className="text-sm text-gray-500">
                  {new Date(p.prescribedDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Phác đồ: {p.regimenName || "Chưa có"} <br />
                Bác sĩ: {p.doctorName || "Chưa có"}
              </p>
              <p className="text-xs text-gray-500">Trạng thái: {p.status}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
