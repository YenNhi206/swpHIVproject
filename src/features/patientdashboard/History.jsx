import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History as HistoryIcon, FileText, BookOpen, FileDown, Filter, Info, Calendar } from 'lucide-react';


export default function History() {
  const today = new Date().toISOString().split('T')[0];

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mockHistory = [
    {
      id: 1,
      date: '2025-04-10',
      type: 'Khám định kỳ',
      description: 'Khám sức khỏe tổng quát, xét nghiệm CD4: 520 tế bào/mm³, tải lượng virus: Không phát hiện.',
      doctor: 'BS. Nguyễn Văn C',
      status: 'Hoàn thành',
    },
    {
      id: 2,
      date: '2025-03-02',
      type: 'Đơn thuốc',
      description: 'ARV: TDF + 3TC + EFV. Cấp thuốc 1 tháng.',
      doctor: 'BS. Trần Thị D',
      status: 'Hoàn thành',
    },
    {
      id: 3,
      date: '2025-01-15',
      type: 'Tư vấn điều trị',
      description: 'Tư vấn tuân thủ điều trị và dinh dưỡng.',
      doctor: 'BS. Lê Văn E',
      status: 'Hoàn thành',
    },
  ];

  const isInvalidRange = toDate && new Date(toDate) > new Date(today);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); // Giả lập loading
  }, []);

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setIsFiltered(true);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setIsFiltered(true);
  };

  const handleFilterTypeChange = (e) => {
    console.log('Filter type changed to:', e.target.value); // Debug
    setFilterType(e.target.value);
    setIsFiltered(true);
  };

  const filterByDateAndSearch = (entries) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const inRange =
        (!fromDate || entryDate >= new Date(fromDate)) &&
        (!toDate || entryDate <= new Date(toDate));
      const matchesSearch =
        !searchInput ||
        entry.id.toString() === searchInput ||
        entry.date === searchInput;
      const matchesType = !filterType || entry.type === filterType;

      return inRange && matchesSearch && matchesType;
    });
  };

  const filteredData = filterByDateAndSearch(mockHistory);

  const handleExportPDF = () => {
    alert('Chức năng xuất PDF đang phát triển!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-red-600">Lịch sử khám & điều trị</h2>
          <p className="mt-2 text-lg text-gray-600">
            Xem lại các lần khám, đơn thuốc và quá trình điều trị HIV
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.2s]">
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Từ ngày
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Calendar className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="date"
                      value={fromDate}
                      onChange={handleFilterChange(setFromDate)}
                      max={today}
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
                <div className="relative flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Đến ngày
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Calendar className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="date"
                      value={toDate}
                      onChange={handleFilterChange(setToDate)}
                      max={today}
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
                <div className="relative flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Nhập ID hoặc ngày
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Filter className="w-5 h-5 text-gray-400 mx-3" />
                    <input
                      type="text"
                      placeholder="VD: 1 hoặc 2025-03-02"
                      value={searchInput}
                      onChange={handleSearchChange}
                      className="w-full p-3 border-none rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
                <div className="relative flex-1">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Loại
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                    <Filter className="w-5 h-5 text-gray-400 mx-3" />
                    <select
                      value={filterType}
                      onChange={handleFilterTypeChange}
                      className="w-full p-3 border-none rounded-lg focus:outline-none appearance-none"
                    >
                      <option value="">Tất cả</option>
                      <option value="Khám định kỳ">Khám định kỳ</option>
                      <option value="Đơn thuốc">Đơn thuốc</option>
                      <option value="Tư vấn điều trị">Tư vấn điều trị</option>
                    </select>
                  </div>
                </div>
              </div>

              {isInvalidRange && (
                <p className="text-red-600 font-semibold mb-4">
                  ❌ Ngày kết thúc không được vượt quá ngày hôm nay ({today}).
                </p>
              )}

              <div className="space-y-4">
                {isFiltered && !isInvalidRange && filteredData.length > 0 && (
                  <p className="font-bold text-gray-700">
                    📌 Có {filteredData.length} kết quả được tìm thấy.
                  </p>
                )}

                {!isFiltered ? (
                  <p className="italic text-gray-500">
                    🔍 Vui lòng chọn khoảng thời gian hoặc nhập thông tin để xem lịch sử.
                  </p>
                ) : !isInvalidRange && filteredData.length === 0 ? (
                  <p className="italic text-gray-500">Không có dữ liệu phù hợp với điều kiện đã chọn.</p>
                ) : (
                  filteredData.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {item.type === 'Khám định kỳ' && <History className="w-5 h-5 text-red-500" />}
                          {item.type === 'Đơn thuốc' && <FileText className="w-5 h-5 text-red-500" />}
                          {item.type === 'Tư vấn điều trị' && <BookOpen className="w-5 h-5 text-red-500" />}
                          <strong className="text-gray-800">{item.type}</strong>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-sm text-gray-500 mt-1">Bác sĩ: {item.doctor}</p>
                      <p className="text-sm text-gray-500">Trạng thái: {item.status}</p>
                      <div className="flex gap-2 mt-3">
                        <Link
                          to={`/history/${item.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                        >
                          <Info className="w-4 h-4" />
                          Xem chi tiết
                        </Link>
                        <button
                          onClick={handleExportPDF}
                          className="inline-flex items-center gap-1 px-3 py-1 border border-red-600 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300"
                        >
                          <FileDown className="w-4 h-4" />
                          Xuất PDF
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}