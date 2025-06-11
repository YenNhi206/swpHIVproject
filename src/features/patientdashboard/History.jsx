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

export  function History() {
  const today = new Date().toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);

  const isInvalidRange = toDate && new Date(toDate) > new Date(today);

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setIsFiltered(true);
  };

  const filterByDate = (entries) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        (!fromDate || entryDate >= new Date(fromDate)) &&
        (!toDate || entryDate <= new Date(toDate))
      );
    });
  };

  const filteredData = filterByDate(mockHistory);

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
            onChange={handleFilterChange(setFromDate)}
            max={today}
          />
        </div>
        <div>
          <label>Đến ngày: </label>
          <input
            type="date"
            value={toDate}
            onChange={handleFilterChange(setToDate)}
            max={today}
          />
        </div>
      </div>

      {isInvalidRange && (
        <p style={styles.error}>
          ❌ Ngày kết thúc không được vượt quá ngày hôm nay ({today}).
        </p>
      )}

      <div style={styles.historyList}>
        {!isFiltered ? (
          <p style={styles.noData}>
            🔍 Vui lòng chọn khoảng thời gian để xem lịch sử khám và điều trị.
          </p>
        ) : !isInvalidRange && filteredData.length === 0 ? (
          <p style={styles.noData}>Không có dữ liệu trong khoảng thời gian đã chọn.</p>
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
  },
  subTitle: {
    color: "#555",
    marginBottom: "20px",
  },
  filterSection: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
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
export default History
