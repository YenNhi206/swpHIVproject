import React, { useState, useEffect } from "react";

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState(null);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("appointments");

  const [filterAppointmentStatus, setFilterAppointmentStatus] = useState("ALL");
  const [filterTestResultStatus, setFilterTestResultStatus] = useState("ALL");
  const [filterPrescriptionStatus, setFilterPrescriptionStatus] = useState("ALL");

  const [searchId, setSearchId] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const patientId = localStorage.getItem("patientId");
        const token = localStorage.getItem("token") || "";

        const res = await fetch(`http://localhost:8080/api/patients/${patientId}/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorBody = await res.json().catch(() => ({}));
          throw new Error(
            `Lỗi khi tải dữ liệu: ${res.status} - ${errorBody.error || res.statusText}`
          );
        }

        const data = await res.json();


        if (data.appointments && data.appointments.length > 0) {
          data.appointments.sort((a, b) => b.id - a.id);
        }

        setHistory(data);
        console.log("Dữ liệu đã sắp xếp theo ID:", data.appointments);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);


  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid date");
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Ho_Chi_Minh",
      });
    } catch {
      return dateString;
    }
  };


  const formatStatus = (status) => {
    const statusMap = {
      BOOKED: { text: "Đã đặt", color: "text-green-600 bg-green-100" },
      CANCELLED: { text: "Đã hủy", color: "text-red-600 bg-red-100" },
      COMPLETED: { text: "Hoàn thành", color: "text-blue-600 bg-blue-100" },
      IN_PROGRESS: {
        text: "Đang tiến hành",
        color: "text-yellow-600 bg-yellow-100",
      },
      PENDING: { text: "Chờ xử lý", color: "text-orange-600 bg-orange-100" },
      ACTIVE: { text: "Đang hoạt động", color: "text-green-600 bg-green-100" },
      INACTIVE: { text: "Không hoạt động", color: "text-gray-600 bg-gray-100" },
    };

    const statusInfo = statusMap[status] || {
      text: status,
      color: "text-gray-600 bg-gray-100",
    };
    return (
      <span
        className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusColors[status] || "bg-gray-200 text-gray-800"}`}
      >
        {map[status] || status}
      </span>
    );
  };

  const Section = ({ title, data, renderItem }) => (
    <section className="mb-12">
      <h3 className="text-xl font-semibold text-red-700 mb-4 border-l-4 border-red-500 pl-3">
        {title} ({data?.length || 0})
      </h3>
      {data && data.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-red-700">#{item.id}</span>
                {formatStatus(item.status)}
              </div>
              {renderItem(item)}
            </div>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-500 text-center">Không có {title.toLowerCase()}.</p>
      )}
    </section>
  );

  if (isLoading) return <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-red-700 mb-10 border-b-2 border-red-500 pb-2">
        Lịch sử khám bệnh
      </h2>

      <Section
        title="Cuộc hẹn"
        data={history.appointments}
        renderItem={(item) => (
          <div className="text-sm space-y-1 text-gray-800">
            <p><strong>Ngày hẹn:</strong> {formatDate(item.appointmentDate)}</p>
            <p><strong>Loại:</strong> {item.appointmentType === "FIRST_VISIT" ? "Khám lần đầu" : "Tái khám"}</p>
            <p><strong>Bác sĩ:</strong> {item.doctorName || "Không rõ"}</p>
            <p><strong>Dịch vụ:</strong> {item.serviceName || "Không rõ"}</p>
          </div>
        )}
      />

      <Section
        title="Kết quả xét nghiệm"
        data={history.testResults}
        renderItem={(item) => (
          <div className="text-sm space-y-1 text-gray-800">
            <p><strong>Ngày:</strong> {formatDate(item.createdAt)}</p>
            <p><strong>Loại:</strong> {item.testCategoryName || item.testCategoryId}</p>
            <p><strong>Kết quả:</strong> {item.resultValue || "Chưa có"}</p>
            {item.resultNote && <p><strong>Ghi chú:</strong> {item.resultNote}</p>}
            {item.doctorName && <p><strong>Bác sĩ:</strong> {item.doctorName}</p>}
          </div>
        )}
      />

      <Section
        title="Đơn thuốc"
        data={history.prescriptions}
        renderItem={(item) => (
          <div className="text-sm space-y-1 text-gray-800">
            <p><strong>Ngày kê:</strong> {formatDate(item.prescribedDate)}</p>
            <p><strong>Bác sĩ:</strong> {item.doctorName || `#${item.doctorId}`}</p>
            <p><strong>Phác đồ:</strong> {item.protocolName || `#${item.protocolId}`}</p>
            {item.customInstructions && <p><strong>Hướng dẫn:</strong> {item.customInstructions}</p>}
          </div>
        )}
      />
    </div>
  );
}