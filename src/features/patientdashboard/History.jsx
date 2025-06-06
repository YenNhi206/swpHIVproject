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

export default function History() {
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState("2025-06-01");

  const filterByDate = (entries) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= new Date(fromDate) && entryDate <= new Date(toDate);
    });
  };

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
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label>Đến ngày: </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      <div style={styles.historyList}>
        {filterByDate(mockHistory).length === 0 ? (
          <p style={styles.noData}>Không có dữ liệu trong khoảng thời gian đã chọn.</p>
        ) : (
          filterByDate(mockHistory).map((item) => (
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
};
