import React, { useState } from "react";

// Dữ liệu mẫu
const mockHistory = [
  {
    id: 1,
    date: "2025-04-10",
    type: "Khám định kỳ",
    description: "Khám sức khỏe tổng quát, xét nghiệm CD4 và tải lượng virus.",
  },
  {
    id: 2,
    date: "2025-03-02",
    type: "Đơn thuốc",
    description: "ARV: TDF + 3TC + EFV. Cấp thuốc 1 tháng.",
  },
  {
    id: 3,
    date: "2025-01-15",
    type: "Tư vấn điều trị",
    description: "Tư vấn tuân thủ điều trị và dinh dưỡng.",
  },
];

export function History() {
  const today = new Date().toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const isInvalidRange = toDate && new Date(toDate) > new Date(today);

  const updateFilterState = (from, to, search) => {
    const isActive =
      from.trim() !== "" || to.trim() !== "" || search.trim() !== "";
    setIsFiltered(isActive);
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
          entry.id.toString() === trimmedSearch ||
          entry.date === trimmedSearch;
        return inRange && matchesSearch;
      }

      return inRange;
    });
  };

  const filteredData = filterByDateAndSearch(mockHistory);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lịch sử khám & điều trị</h2>
      <p style={styles.subTitle}>
        Xem lại các lần khám, đơn thuốc và quá trình điều trị HIV
      </p>

      <div style={styles.filterSection}>
        <div>
          <label>Từ ngày: </label>
          <input
            type="date"
            value={fromDate}
            onChange={handleFilterChange(setFromDate, "from")}
            max={today}
            style={styles.input}
          />
        </div>
        <div>
          <label>Đến ngày: </label>
          <input
            type="date"
            value={toDate}
            onChange={handleFilterChange(setToDate, "to")}
            max={today}
            style={styles.input}
          />
        </div>
        <div>
          <label>Nhập ID hoặc ngày: </label>
          <input
            type="text"
            placeholder="VD: 1 hoặc YYYY-MM-DD"
            value={searchInput}
            onChange={handleSearchChange}
            style={styles.input}
          />
        </div>
      </div>

      {isInvalidRange && (
        <p style={styles.error}>
          ❌ Ngày kết thúc không được vượt quá ngày hôm nay ({today}).
        </p>
      )}

      <div style={styles.historyList}>
        {isFiltered && !isInvalidRange && filteredData.length > 0 && (
          <p style={{ fontWeight: "bold" }}>
            📌 Có {filteredData.length} kết quả được tìm thấy.
          </p>
        )}

        {!isFiltered ? (
          <p style={styles.noData}>
            🔍 Vui lòng chọn khoảng thời gian hoặc nhập thông tin để xem lịch sử.
          </p>
        ) : !isInvalidRange && filteredData.length === 0 ? (
          <p style={styles.noData}>
            Không có dữ liệu phù hợp với điều kiện đã chọn.
          </p>
        ) : (
          filteredData.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <strong>{item.type}</strong>
                <span style={styles.date}>
                  {new Date(item.date).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <p style={styles.description}>{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "4px",
    color: "oklch(0.577 0.245 27.325)",
  },
  subTitle: {
    color: "#555",
    marginBottom: "20px",
  },
  filterSection: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "180px",
    outline: "none",
  },
  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  date: {
    fontSize: "12px",
    color: "#666",
  },
  description: {
    fontSize: "14px",
    marginTop: "4px",
  },
  noData: {
    fontStyle: "italic",
    color: "#888",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontWeight: "bold",
  },
};

export default History;
