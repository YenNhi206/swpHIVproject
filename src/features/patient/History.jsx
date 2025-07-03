import React, { useState, useMemo } from "react";

const mockHistory = [
  { id: 1, date: "2025-04-10", type: "Khám định kỳ", description: "Khám sức khỏe tổng quát, xét nghiệm CD4 và tải lượng virus." },
  { id: 2, date: "2025-03-02", type: "Đơn thuốc", description: "ARV: TDF + 3TC + EFV. Cấp thuốc 1 tháng." },
  { id: 3, date: "2025-01-15", type: "Tư vấn điều trị", description: "Tư vấn tuân thủ điều trị và dinh dưỡng." },
  { id: 4, date: "2024-12-05", type: "Xét nghiệm máu", description: "Xét nghiệm CD4: 500 cells/mm³, tải lượng virus: dưới ngưỡng phát hiện." },
  { id: 5, date: "2024-10-20", type: "Khám định kỳ", description: "Tái khám định kỳ, không có dấu hiệu bất thường." },
  { id: 6, date: "2024-08-12", type: "Đơn thuốc", description: "ARV: AZT + 3TC + NVP. Đổi phác đồ do tác dụng phụ." },
  { id: 7, date: "2024-07-01", type: "Tư vấn tâm lý", description: "Tư vấn hỗ trợ tinh thần, giảm lo âu và kỳ thị bản thân." },
  { id: 8, date: "2024-05-23", type: "Tư vấn điều trị", description: "Tư vấn cải thiện chế độ ăn uống và luyện tập." },
  { id: 9, date: "2024-04-10", type: "Khám khẩn cấp", description: "Sốt cao, nghi ngờ nhiễm trùng cơ hội. Đã điều trị bằng kháng sinh." },
  { id: 10, date: "2024-02-18", type: "Xét nghiệm máu", description: "Xét nghiệm định kỳ: CD4 tăng lên 600, tải lượng ổn định." },
];

export default function History() {
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const years = [];
    for (let y = currentYear; y >= startYear; y--) {
      years.push(y);
    }
    return years;
  }, []);


  const [selectedYear, setSelectedYear] = useState(availableYears[0] || new Date().getFullYear());
  const [searchInput, setSearchInput] = useState("");

  const filteredData = useMemo(() => {
    return mockHistory
      .filter(item => new Date(item.date).getFullYear() === selectedYear)
      .filter(item => {
        const search = searchInput.trim().toLowerCase();
        if (!search) return true;
        return (
          item.id.toString() === search ||
          item.date.includes(search) ||
          item.type.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search)
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // sắp xếp mới nhất lên trước
  }, [selectedYear, searchInput]);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[15px]">
      <h2 className="text-3xl font-bold mb-1" style={{ color: "oklch(0.577 0.245 27.325)" }}>
        Lịch sử khám & điều trị
      </h2>
      <p className="text-gray-600 mb-6">
        Xem lại các lần khám, đơn thuốc và quá trình điều trị HIV trong năm {selectedYear}
      </p>

      <div className="flex flex-wrap gap-6 mb-6 items-end">
        {/* Dropdown chọn năm */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Chọn năm</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-gray-700 mb-1">Tìm kiếm (ID, ngày, loại, mô tả)</label>
          <input
            type="text"
            placeholder="VD: 1 hoặc 2024-12-05 hoặc Khám"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <strong className="text-base" style={{ color: "oklch(0.577 0.245 27.325)" }}>
                  {item.type}
                </strong>
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="italic text-gray-500">Không có dữ liệu phù hợp với năm và tìm kiếm.</p>
        )}
      </div>
    </div>
  );
}
