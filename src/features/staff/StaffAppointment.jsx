import React, { useEffect, useState } from "react";
import { Tabs, Table, message, Select, Tooltip } from "antd";

const { TabPane } = Tabs;

const tabStatusMap = {
  "Đã đặt": "BOOKED",
  "Chưa đến": "PENDING",
  "Đã đến": "CHECKED_IN",
  "Đang khám": "IN_PROGRESS",
  "Hoàn tất": "COMPLETED",
  Vắng: "ABSENT",
};

const statusOptions = [
  { value: "BOOKED", label: "Đã đặt" },
  { value: "CANCELLED", label: "Đã hủy" },
  { value: "PENDING", label: "Chưa đến" },
  { value: "CHECKED_IN", label: "Đã đến" },
  { value: "IN_PROGRESS", label: "Đang khám" },
  { value: "COMPLETED", label: "Hoàn tất" },
  { value: "ABSENT", label: "Vắng" },
];


const columnsNormal = [
  {
    title: "Họ tên / Bí danh",
    render: (_, record) =>
      record.fullName || record.aliasName || <i>Chưa cung cấp</i>,
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
      text === "FIRST_VISIT"
        ? "Khám lần đầu"
        : text === "FOLLOW_UP"
          ? "Tái khám"
          : text,
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

export default function StaffAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Đã đặt");
  const [bookingMode, setBookingMode] = useState("NORMAL");
  const [updatingId, setUpdatingId] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      if (!token) throw new Error("Vui lòng đăng nhập để xem lịch hẹn.");

      const status = tabStatusMap[activeTab];
      const url = `http://localhost:8080/api/appointments?status=${status}`;

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
      const res = await fetch(
        `http://localhost:8080/api/appointments/${id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

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

  const getColumns = () => columnsNormal;

  return (
    <div
      className="p-6"
      style={{
        maxWidth: 1200,
        margin: "auto",
        overflowX: "auto",
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <h2 className="text-xl font-semibold mb-4">Quản lý lịch hẹn</h2>

      <div
        style={{
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            type="line"
            size="small"
          >
            {Object.keys(tabStatusMap).map((key) => (
              <TabPane tab={key} key={key} />
            ))}
          </Tabs>
        </div>
      </div>

      <Table
        columns={getColumns()}
        dataSource={appointmentsWithHandlers}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}
