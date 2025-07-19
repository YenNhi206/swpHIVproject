import React, { useState, useEffect } from "react";

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const patientId = localStorage.getItem("patientId");
        const token = localStorage.getItem("token") || "";

        const res = await fetch(
          `http://localhost:8080/api/patients/${patientId}/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorBody = await res.json().catch(() => ({}));
          throw new Error(
            `Lỗi khi tải dữ liệu lịch sử: ${res.status} - ${
              errorBody.error || res.statusText
            }`
          );
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

  // Hàm format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Hàm format status
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
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
      >
        {statusInfo.text}
      </span>
    );
  };

  // Hàm format booking mode
  const formatBookingMode = (mode) => {
    const modeMap = {
      NORMAL: { text: "Khám trực tiếp", icon: "🏥" },
      ONLINE: { text: "Tư vấn online", icon: "💻" },
      ANONYMOUS_ONLINE: { text: "Tư vấn ẩn danh", icon: "👤" },
    };

    const modeInfo = modeMap[mode] || { text: mode, icon: "❓" };
    return (
      <span className="flex items-center gap-1">
        <span>{modeInfo.icon}</span>
        <span>{modeInfo.text}</span>
      </span>
    );
  };

  if (isLoading)
    return (
      <p className="text-center text-red-400 mt-10 animate-pulse">
        Đang tải dữ liệu lịch sử...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-600 mt-10 font-semibold">{error}</p>
    );
  if (!history)
    return (
      <p className="text-center text-red-500 mt-10 italic">
        Không có dữ liệu lịch sử.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-base text-gray-900">
      <h2 className="text-4xl font-extrabold mb-8 text-red-700 border-b-4 border-red-600 pb-2">
        Lịch sử khám &amp; điều trị
      </h2>

      {/* Cuộc hẹn */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-red-600 mb-4 border-l-4 border-red-500 pl-3">
          Cuộc hẹn ({history.appointments?.length || 0})
        </h3>
        {history.appointments && history.appointments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {history.appointments.map((appt) => (
              <div
                key={appt.id}
                className="p-6 bg-white border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Header với status */}
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-lg text-red-700">#{appt.id}</h4>
                  {formatStatus(appt.status)}
                </div>

                {/* Thông tin cơ bản */}
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">
                      Ngày hẹn:
                    </span>
                    <p className="text-gray-900">
                      {formatDate(appt.appointmentDate)}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">
                      Loại hẹn:
                    </span>
                    <p className="text-gray-900">
                      {appt.appointmentType === "FIRST_VISIT"
                        ? "Khám lần đầu"
                        : "Tái khám"}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">
                      Phương thức:
                    </span>
                    <p className="text-gray-900">
                      {formatBookingMode(appt.bookingMode)}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">Bác sĩ:</span>
                    <p className="text-gray-900">{appt.doctorName || "N/A"}</p>
                    <p className="text-sm text-gray-600">
                      {appt.specialization || "N/A"}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">
                      Dịch vụ:
                    </span>
                    <p className="text-gray-900">{appt.serviceName || "N/A"}</p>
                    <p className="text-sm text-gray-600">
                      Giá:{" "}
                      {appt.price
                        ? `${parseInt(appt.price).toLocaleString("vi-VN")} VNĐ`
                        : "N/A"}
                    </p>
                  </div>

                  {/* Thông tin bệnh nhân */}
                  {(appt.fullName || appt.phone || appt.gender) && (
                    <div className="border-t pt-3">
                      <span className="font-semibold text-gray-700">
                        Thông tin bệnh nhân:
                      </span>
                      {appt.fullName && (
                        <p className="text-gray-900">Tên: {appt.fullName}</p>
                      )}
                      {appt.phone && (
                        <p className="text-gray-900">SĐT: {appt.phone}</p>
                      )}
                      {appt.gender && (
                        <p className="text-gray-900">
                          Giới tính:{" "}
                          {appt.gender === "MALE"
                            ? "Nam"
                            : appt.gender === "FEMALE"
                            ? "Nữ"
                            : appt.gender}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Mô tả */}
                  {appt.description && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Mô tả:
                      </span>
                      <p className="text-gray-900 text-sm">
                        {appt.description}
                      </p>
                    </div>
                  )}

                  {/* Google Meet Link */}
                  {appt.googleMeetLink && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Link họp:
                      </span>
                      <a
                        href={appt.googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm break-all"
                      >
                        {appt.googleMeetLink}
                      </a>
                    </div>
                  )}

                  {/* Đơn thuốc */}
                  {appt.prescriptions && appt.prescriptions.length > 0 && (
                    <div className="border-t pt-3">
                      <span className="font-semibold text-gray-700">
                        Đơn thuốc ({appt.prescriptions.length}):
                      </span>
                      {appt.prescriptions.map((presc, index) => (
                        <div
                          key={presc.id}
                          className="mt-2 p-2 bg-gray-50 rounded"
                        >
                          <p className="text-sm font-medium">Đơn #{presc.id}</p>
                          <p className="text-xs text-gray-600">
                            Trạng thái: {formatStatus(presc.status)}
                          </p>
                          {presc.customInstructions && (
                            <p className="text-xs text-gray-600">
                              Hướng dẫn: {presc.customInstructions}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="italic text-red-500 text-lg">
              Không có lịch sử cuộc hẹn.
            </p>
          </div>
        )}
      </section>

      {/* Kết quả xét nghiệm */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-red-600 mb-4 border-l-4 border-red-500 pl-3">
          Kết quả xét nghiệm ({history.testResults?.length || 0})
        </h3>
        {history.testResults && history.testResults.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {history.testResults.map((test) => (
              <div
                key={test.id}
                className="p-6 bg-white border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-lg text-red-700">#{test.id}</h4>
                  {formatStatus(test.status)}
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">
                      Ngày xét nghiệm:
                    </span>
                    <p className="text-gray-900">
                      {formatDate(test.createdAt)}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">
                      Loại xét nghiệm:
                    </span>
                    <p className="text-gray-900">
                      {test.testCategoryName || test.testCategoryId || "N/A"}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">
                      Kết quả:
                    </span>
                    <p className="text-gray-900 font-medium">
                      {test.resultValue || "Chưa có kết quả"}
                    </p>
                  </div>

                  {test.resultNote && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Ghi chú:
                      </span>
                      <p className="text-gray-900 text-sm">{test.resultNote}</p>
                    </div>
                  )}

                  {test.doctorName && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Bác sĩ chỉ định:
                      </span>
                      <p className="text-gray-900">{test.doctorName}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="italic text-red-500 text-lg">
              Không có kết quả xét nghiệm.
            </p>
          </div>
        )}
      </section>

      {/* Đơn thuốc */}
      <section>
        <h3 className="text-2xl font-semibold text-red-600 mb-4 border-l-4 border-red-500 pl-3">
          Đơn thuốc ({history.prescriptions?.length || 0})
        </h3>
        {history.prescriptions && history.prescriptions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {history.prescriptions.map((presc) => (
              <div
                key={presc.id}
                className="p-6 bg-white border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-lg text-red-700">
                    #{presc.id}
                  </h4>
                  {formatStatus(presc.status)}
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">
                      Ngày kê đơn:
                    </span>
                    <p className="text-gray-900">
                      {formatDate(presc.prescribedDate)}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">
                      Phác đồ:
                    </span>
                    <p className="text-gray-900">
                      {presc.protocolName ||
                        `Protocol #${presc.protocolId}` ||
                        "N/A"}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-700">Bác sĩ:</span>
                    <p className="text-gray-900">
                      {presc.doctorName || `Doctor #${presc.doctorId}` || "N/A"}
                    </p>
                  </div>

                  {presc.startDateLocal && presc.endDateLocal && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Thời gian điều trị:
                      </span>
                      <p className="text-gray-900 text-sm">
                        Từ: {formatDate(presc.startDateLocal)} - Đến:{" "}
                        {formatDate(presc.endDateLocal)}
                      </p>
                    </div>
                  )}

                  {presc.customInstructions && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Hướng dẫn:
                      </span>
                      <p className="text-gray-900 text-sm">
                        {presc.customInstructions}
                      </p>
                    </div>
                  )}

                  {presc.dosageAdjustments && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Liều lượng:
                      </span>
                      <p className="text-gray-900 text-sm">
                        {presc.dosageAdjustments}
                      </p>
                    </div>
                  )}

                  {presc.notes && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Ghi chú:
                      </span>
                      <p className="text-gray-900 text-sm">{presc.notes}</p>
                    </div>
                  )}

                  {presc.appointmentId && (
                    <div>
                      <span className="font-semibold text-gray-700">
                        Liên kết cuộc hẹn:
                      </span>
                      <p className="text-gray-900 text-sm">
                        #{presc.appointmentId}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="italic text-red-500 text-lg">Không có đơn thuốc.</p>
          </div>
        )}
      </section>
    </div>
  );
}
