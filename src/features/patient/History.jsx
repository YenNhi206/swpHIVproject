import React, { useEffect, useState } from "react";

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
          throw new Error(`Lỗi khi tải dữ liệu: ${res.status} - ${errorBody.error || res.statusText}`);
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

  const formatDate = (str) => {
    if (!str) return "N/A";
    const date = new Date(str);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColors = {
    BOOKED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    PENDING: "bg-orange-100 text-orange-700",
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-gray-100 text-gray-700",
    DISCONTINUED: "bg-gray-100 text-gray-500",
  };

  const formatStatus = (status) => {
    const map = {
      BOOKED: "Đã đặt",
      CANCELLED: "Đã hủy",
      COMPLETED: "Hoàn thành",
      IN_PROGRESS: "Đang tiến hành",
      PENDING: "Chờ xử lý",
      ACTIVE: "Đang hoạt động",
      INACTIVE: "Không hoạt động",
      DISCONTINUED: "Đã ngưng",
    };

    return (
      <span className={`px-2.5 py-1 text-xs font-medium rounded-full shadow-sm ${statusColors[status] || "bg-gray-200 text-gray-800"}`}>
        {map[status] || status}
      </span>
    );
  };

  const sortByDateDesc = (a, b, key) => new Date(b[key] || b.createdAt) - new Date(a[key] || a.createdAt);

  const matchSearch = (item, dateKey) => {
    const idMatch = !searchId || item.id.toString().includes(searchId);
    const dateMatch =
      !searchDate ||
      (item[dateKey] &&
        new Date(item[dateKey]).toLocaleDateString("vi-VN") ===
          new Date(searchDate).toLocaleDateString("vi-VN"));
    return idMatch && dateMatch;
  };

  const filteredAppointments = history?.appointments
    ?.filter(
      (item) =>
        (filterAppointmentStatus === "ALL" || item.status === filterAppointmentStatus) &&
        matchSearch(item, "appointmentDate")
    )
    ?.sort((a, b) => sortByDateDesc(a, b, "appointmentDate"));

  const filteredTestResults = history?.testResults
    ?.filter(
      (item) =>
        (filterTestResultStatus === "ALL" || item.status === filterTestResultStatus) &&
        matchSearch(item, "createdAt")
    )
    ?.sort((a, b) => sortByDateDesc(a, b, "createdAt"));

  const filteredPrescriptions = history?.prescriptions
    ?.filter(
      (item) =>
        (filterPrescriptionStatus === "ALL" || item.status === filterPrescriptionStatus) &&
        matchSearch(item, "prescribedDate")
    )
    ?.sort((a, b) => sortByDateDesc(a, b, "prescribedDate"));

  const Section = ({ icon, title, filter, data, renderItem }) => (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-5 bg-white px-4 py-3 rounded-xl shadow border">
        <div className="flex items-center gap-3 text-red-600 font-semibold text-lg">
          {icon}
          <span>{title}</span>
          <span className="ml-2 text-sm text-gray-500 font-medium">({data?.length || 0})</span>
        </div>
        {filter}
      </div>
      {data && data.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-red-600">#{item.id}</span>
                {formatStatus(item.status)}
              </div>
              {renderItem(item)}
            </div>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-500 text-center">Không có {title.toLowerCase()} phù hợp.</p>
      )}
    </section>
  );

  if (isLoading) return <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen rounded-3xl shadow-sm bg-gradient-to-tr from-white via-red-50 to-white">
      <h2 className="text-4xl font-extrabold text-red-700 mb-8 border-b-4 border-red-500 pb-3 text-center">
        Lịch sử khám bệnh
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm theo ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="px-4 py-2 text-sm rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="px-4 py-2 text-sm rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-400 focus:outline-none"
        />
      </div>

      <div className="flex justify-center gap-4 mb-10">
        {[
          { key: "appointments", label: "Cuộc hẹn" },
          { key: "testResults", label: "Xét nghiệm" },
          { key: "prescriptions", label: "Đơn thuốc" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md border-2 text-sm
              ${activeTab === tab.key
                ? "bg-gradient-to-r from-red-500 to-purple-600 text-white border-transparent"
                : "bg-white text-red-600 border-red-300 hover:border-red-400 hover:bg-red-100"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "appointments" && (
        <Section
          title="Cuộc hẹn"
          icon={<i className="fa-solid fa-calendar-check text-xl"></i>}
          data={filteredAppointments}
          filter={
            <div className="flex gap-2 flex-wrap">
              {["ALL", "BOOKED", "CANCELLED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterAppointmentStatus(status)}
                  className={`px-3 py-1 text-sm rounded-full border font-medium transition
                    ${filterAppointmentStatus === status
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"}`}
                >
                  {{ ALL: "Tất cả", BOOKED: "Đã đặt", CANCELLED: "Đã hủy" }[status]}
                </button>
              ))}
            </div>
          }
          renderItem={(item) => (
            <div className="text-sm space-y-1 text-gray-800">
              <p><strong>Ngày hẹn:</strong> {formatDate(item.appointmentDate)}</p>
              <p><strong>Loại:</strong> {item.appointmentType === "FIRST_VISIT" ? "Khám lần đầu" : "Tái khám"}</p>
              <p><strong>Bác sĩ:</strong> {item.doctorName || "Không rõ"}</p>
              <p><strong>Dịch vụ:</strong> {item.serviceName || "Không rõ"}</p>
            </div>
          )}
        />
      )}

      {activeTab === "testResults" && (
        <Section
          title="Xét nghiệm"
          icon={<i className="fa-solid fa-vial text-xl"></i>}
          data={filteredTestResults}
          filter={
            <div className="flex gap-2 flex-wrap">
              {["ALL", "COMPLETED", "IN_PROGRESS", "PENDING"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterTestResultStatus(status)}
                  className={`px-3 py-1 text-sm rounded-full border font-medium transition
                    ${filterTestResultStatus === status
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"}`}
                >
                  {{
                    ALL: "Tất cả",
                    COMPLETED: "Hoàn thành",
                    IN_PROGRESS: "Đang tiến hành",
                    PENDING: "Chờ xử lý",
                  }[status]}
                </button>
              ))}
            </div>
          }
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
      )}

      {activeTab === "prescriptions" && (
        <Section
          title="Đơn thuốc"
          icon={<i className="fa-solid fa-prescription-bottle-medical text-xl"></i>}
          data={filteredPrescriptions}
          filter={
            <div className="flex gap-2 flex-wrap">
              {["ALL", "ACTIVE", "INACTIVE", "DISCONTINUED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterPrescriptionStatus(status)}
                  className={`px-3 py-1 text-sm rounded-full border font-medium transition
                    ${filterPrescriptionStatus === status
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-red-50"}`}
                >
                  {{
                    ALL: "Tất cả",
                    ACTIVE: "Đang hoạt động",
                    INACTIVE: "Không hoạt động",
                    DISCONTINUED: "Đã ngưng",
                  }[status]}
                </button>
              ))}
            </div>
          }
          renderItem={(item) => (
            <div className="text-sm space-y-1 text-gray-800">
              <p><strong>Ngày kê:</strong> {formatDate(item.prescribedDate)}</p>
              <p><strong>Bác sĩ:</strong> {item.doctorName || `#${item.doctorId}`}</p>
              <p><strong>Phác đồ:</strong> {item.protocolName || `#${item.protocolId}`}</p>
              {item.customInstructions && (
                <p><strong>Hướng dẫn:</strong> {item.customInstructions}</p>
              )}
            </div>
          )}
        />
      )}
    </div>
  );
}
