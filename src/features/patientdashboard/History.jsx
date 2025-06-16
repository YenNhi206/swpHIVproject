import React, { useState } from "react";

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
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const isInvalidRange = toDate && new Date(toDate) > new Date(today);

  const updateFilterState = (from, to, search) => {
    setIsFiltered(from.trim() !== "" || to.trim() !== "" || search.trim() !== "");
  };

  const handleFilterChange = (setter, field) => (e) => {
    const value = e.target.value;
    setter(value);
    updateFilterState(
      field === "from" ? value : fromDate,
      field === "to" ? value : toDate,
      searchInput
    );
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    updateFilterState(fromDate, toDate, value);
  };

  const filterByDateAndSearch = (entries) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const inRange =
        (!fromDate || entryDate >= new Date(fromDate)) &&
        (!toDate || entryDate <= new Date(toDate));
      const trimmedSearch = searchInput.trim();
      if (trimmedSearch !== "") {
        const matchesSearch =
          entry.id.toString() === trimmedSearch || entry.date === trimmedSearch;
        return inRange && matchesSearch;
      }
      return inRange;
    });
  };

  const filteredData = isInvalidRange ? null : filterByDateAndSearch(mockHistory);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-[15px]">
      <h2 className="text-3xl font-bold mb-1" style={{ color: "oklch(0.577 0.245 27.325)" }}>
        Lịch sử khám & điều trị
      </h2>
      <p className="text-gray-600 mb-6">Xem lại các lần khám, đơn thuốc và quá trình điều trị HIV</p>

      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
          <input
            type="date"
            value={fromDate}
            onChange={handleFilterChange(setFromDate, "from")}
            max={today}
            className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
          <input
            type="date"
            value={toDate}
            onChange={handleFilterChange(setToDate, "to")}
            max={today}
            className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-gray-700 mb-1">Nhập ID hoặc ngày</label>
          <input
            type="text"
            placeholder="VD: 1 hoặc YYYY-MM-DD"
            value={searchInput}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
          />
        </div>
      </div>

      {isInvalidRange && (
        <p className="text-red-600 font-semibold mb-4">
          ❌ Ngày kết thúc không được vượt quá ngày hôm nay ({today}).
        </p>
      )}

      <div className="space-y-4">
        {!isInvalidRange && isFiltered && filteredData?.length > 0 && (
          <p className="font-semibold text-green-700">
            📌 Có {filteredData.length} kết quả được tìm thấy.
          </p>
        )}

        {!isInvalidRange && !isFiltered ? (
          <p className="italic text-gray-500">
            🔍 Vui lòng chọn khoảng thời gian hoặc nhập thông tin để xem lịch sử.
          </p>
        ) : !isInvalidRange && filteredData?.length === 0 ? (
          <p className="italic text-gray-500">
            Không có dữ liệu phù hợp với điều kiện đã chọn.
          </p>
        ) : (
          filteredData?.map((item) => (
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
        )}
      </div>
    </div>
  );
}
