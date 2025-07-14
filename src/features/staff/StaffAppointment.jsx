import React, { useEffect, useState } from "react";
import { Tabs, Table, message, Select } from "antd";

const { TabPane } = Tabs;

const tabStatusMap = {
  "Tất cả": "",
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

export default function StaffAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [updatingId, setUpdatingId] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error("Vui lòng đăng nhập để xem lịch hẹn.");
      }

      const status = tabStatusMap[activeTab];
      const url = status
        ? `http://localhost:8080/api/appointments?status=${status}`
        : "http://localhost:8080/api/appointments";

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch appointments: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      const appointmentsData = data.content ? data.content : Array.isArray(data) ? data : [];
      setAppointments(appointmentsData);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      message.error("Lỗi khi tải lịch hẹn: " + (err.message || "Lỗi không xác định"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [activeTab, token]);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:8080/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Cập nhật lỗi: ${res.status} - ${errorText}`);
      }

      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
      );
      message.success("Cập nhật trạng thái thành công");
    } catch (err) {
      console.error("Error updating status:", err);
      message.error("Lỗi khi cập nhật trạng thái: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const columns = [
    {
      title: "Họ tên / Bí danh",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => text || record.aliasName || <i>Chưa cung cấp</i>,
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (text) => text || <i>Chưa chỉ định</i>,
    },
    {
      title: "Dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Ngày hẹn",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    {
      title: "Trạng thái",
      key: "actions",
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(value) => handleStatusUpdate(record.id, value)}
          options={statusOptions}
          style={{ width: 200 }}
          loading={updatingId === record.id}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý lịch hẹn</h2>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {Object.keys(tabStatusMap).map((key) => (
          <TabPane tab={key} key={key}>
            <Table
              columns={columns}
              dataSource={appointments}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
