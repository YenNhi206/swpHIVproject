import React, { useEffect, useState } from "react";
import { Tabs, Table, message, Select, Tooltip } from "antd";

const { TabPane } = Tabs;

const tabStatusMap = {
  "Chưa đến": "PENDING",
  "Đã đến": "CHECKED_IN",
  "Đang khám": "IN_PROGRESS",
  "Hoàn tất": "COMPLETED",
  "Vắng": "ABSENT",
};

const statusOptions = [
  { value: "PENDING", label: "Chưa đến" },
  { value: "CHECKED_IN", label: "Đã đến" },
  { value: "IN_PROGRESS", label: "Đang khám" },
  { value: "COMPLETED", label: "Hoàn tất" },
  { value: "ABSENT", label: "Vắng" },
];

const bookingModeOptions = [
  { value: "NORMAL", label: "Lịch thường" },
  { value: "ANONYMOUS", label: "Lịch Online" },
  { value: "ONLINE_ANONYMOUS", label: "Lịch Online Ẩn danh" },
];

// Columns cho lịch thường (bạn giữ nguyên cột này y như cũ)
const columnsNormal = [
  {
    title: "Họ tên / Bí danh",
    render: (_, record) => record.fullName || record.aliasName || <i>Chưa cung cấp</i>,
    width: 150,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    width: 120,
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    width: 80,
  },
  {
    title: "Ngày hẹn",
    dataIndex: "appointmentDate",
    render: (text) => new Date(text).toLocaleString("vi-VN"),
    width: 180,
  },
  {
    title: "Dịch vụ",
    dataIndex: "serviceName",
    width: 130,
  },
  {
    title: "Loại lịch hẹn",
    dataIndex: "appointmentType",
    render: (text) =>
      text === "FIRST_VISIT" ? "Khám lần đầu" : text === "FOLLOW_UP" ? "Tái khám" : text,
    width: 120,
  },
  {
    title: "Giá tiền",
    dataIndex: "price",
    render: (text) => (text ? `${text} đ` : "Miễn phí"),
    width: 100,
  },
  {
    title: "Bác sĩ",
    render: (_, record) => (
      <>
        <div>{record.doctorName || <i>Chưa chỉ định</i>}</div>
        {record.specialization && (
          <div style={{ fontSize: 11, color: "#888", fontStyle: "italic" }}>
            {record.specialization}
          </div>
        )}
      </>
    ),
    width: 140,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    ellipsis: true,
    render: (text) => (
      <Tooltip title={text}>
        <div
          style={{
            maxWidth: 150,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text || <i>Không có</i>}
        </div>
      </Tooltip>
    ),
    width: 150,
  },
  {
    title: "Trạng thái",
    key: "status",
    render: (_, record) => (
      <Select
        value={record.status}
        options={statusOptions}
        style={{ width: 160 }}
        onChange={(value) => record.handleStatusUpdate(record.id, value)}
        loading={record.updating}
      />
    ),
    width: 160,
  },
];

// Columns cho lịch online
const columnsAnonymous = [
  {
    title: "Bí danh",
    dataIndex: "aliasName",
    width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 150,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    width: 120,
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    width: 80,
  },
  {
    title: "Ngày hẹn",
    dataIndex: "appointmentDate",
    render: (text) => new Date(text).toLocaleString("vi-VN"),
    width: 180,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    ellipsis: true,
    render: (text) => (
      <Tooltip title={text}>
        <div
          style={{
            maxWidth: 150,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text || <i>Không có</i>}
        </div>
      </Tooltip>
    ),
    width: 150,
  },
];

// Columns cho lịch online ẩn danh
const columnsOnlineAnonymous = [
  {
    title: "Bí danh",
    dataIndex: "aliasName",
    width: 150,
  },

  {
    title: "Số điện thoại",
    dataIndex: "phone",
    width: 120,
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    width: 80,
  },
  {
    title: "Ngày hẹn",
    dataIndex: "appointmentDate",
    render: (text) => new Date(text).toLocaleString("vi-VN"),
    width: 180,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    ellipsis: true,
    render: (text) => (
      <Tooltip title={text}>
        <div
          style={{
            maxWidth: 150,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text || <i>Không có</i>}
        </div>
      </Tooltip>
    ),
    width: 150,
  },
];

export default function StaffAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Chưa đến");
  const [bookingMode, setBookingMode] = useState("NORMAL");
  const [updatingId, setUpdatingId] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      if (!token) throw new Error("Vui lòng đăng nhập để xem lịch hẹn.");

      let url = "";
      const status = tabStatusMap[activeTab];

      if (bookingMode === "NORMAL") {
        url = `http://localhost:8080/api/appointments?status=${status}`;
      } else if (bookingMode === "ANONYMOUS") {
        url = `http://localhost:8080/api/appointments/anonymous?status=ONLINE_ANONYMOUS_PENDING`;
      } else if (bookingMode === "ONLINE_ANONYMOUS") {
        url = `http://localhost:8080/api/appointments/online-anonymous?status=ONLINE_PENDING`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Lỗi khi gọi API lịch hẹn");

      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      message.error("Lỗi khi tải lịch hẹn: " + err.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [activeTab, bookingMode]);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:8080/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Cập nhật trạng thái thất bại");

      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
      );
      message.success("Cập nhật trạng thái thành công");
    } catch (err) {
      message.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const appointmentsWithHandlers = appointments.map((item) => ({
    ...item,
    handleStatusUpdate,
    updating: updatingId === item.id,
  }));

  const getColumns = () => {
    if (bookingMode === "ANONYMOUS") return columnsAnonymous;
    if (bookingMode === "ONLINE_ANONYMOUS") return columnsOnlineAnonymous;
    return columnsNormal;
  };

  return (
    <div
      className="p-6"
      style={{ maxWidth: 1200, margin: "auto", overflowX: "auto", background: "#fff", borderRadius: 8 }}
    >
      <h2 className="text-xl font-semibold mb-4">Quản lý lịch hẹn</h2>

      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <span style={{ marginRight: 8 }}>Chọn loại lịch:</span>
          <Select
            options={bookingModeOptions}
            value={bookingMode}
            onChange={setBookingMode}
            style={{ width: 180 }}
          />
        </div>

        {/* Chỉ show tab trạng thái khi là lịch thường */}
        {bookingMode === "NORMAL" && (
          <div style={{ flex: 1 }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab} type="line" size="small">
              {Object.keys(tabStatusMap).map((key) => (
                <TabPane tab={key} key={key} />
              ))}
            </Tabs>
          </div>
        )}
      </div>

      <Table
        columns={getColumns()}
        dataSource={appointmentsWithHandlers}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1300 }}
      />
    </div>
  );
}
