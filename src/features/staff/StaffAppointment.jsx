import React, { useEffect, useState } from "react";
import { Tabs, Table, Button, message } from "antd";
import { Clock, Check, Stethoscope, UserCheck, UserX } from "lucide-react";

const { TabPane } = Tabs;

export default function StaffAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Tất cả");

  const tabStatusMap = {
    "Tất cả": "",
    "Chưa đến": "PENDING",
    "Đã đến": "CHECKED_IN",
    "Đang khám": "IN_PROGRESS",
    "Hoàn tất": "COMPLETED",
    "Vắng": "ABSENT",
    "Đang chờ online": "ONLINE_PENDING",
    "Đang chờ online ẩn danh": "ONLINE_ANONYMOUS_PENDING",
  };

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
      console.log("Fetched appointments data:", data);

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

  const getNextStatus = (status) => {
    const flow = ["PENDING", "CHECKED_IN", "IN_PROGRESS", "COMPLETED"];
    const index = flow.indexOf(status);
    return index >= 0 && index < flow.length - 1 ? flow[index + 1] : null;
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    if (!nextStatus) return;

    try {
      const res = await fetch(`http://localhost:8080/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update: ${res.status} - ${errorText}`);
      }

      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
      );
      message.success("Cập nhật trạng thái thành công");
    } catch (err) {
      console.error("Error updating status:", err);
      message.error("Lỗi khi cập nhật trạng thái: " + err.message);
    }
  };

  const handleSetAbsent = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "ABSENT" }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update: ${res.status} - ${errorText}`);
      }

      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updated } : a))
      );
      message.success("Đã đánh dấu vắng mặt");
    } catch (err) {
      console.error("Error setting absent:", err);
      message.error("Lỗi khi cập nhật vắng mặt: " + err.message);
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
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const statusMap = {
          PENDING: "Chưa đến",
          CHECKED_IN: "Đã đến",
          IN_PROGRESS: "Đang khám",
          COMPLETED: "Hoàn tất",
          ABSENT: "Vắng",
          ONLINE_PENDING: "Đang chờ online",
          ONLINE_ANONYMOUS_PENDING: "Đang chờ online ẩn danh",
        };
        return statusMap[text] || text;
      },
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        const next = getNextStatus(record.status);
        return (
          <div className="flex gap-2">
            {next && (
              <Button
                size="small"
                type="primary"
                onClick={() => handleUpdateStatus(record.id, record.status)}
                icon={<Check size={14} />}
              >
                {next === "CHECKED_IN"
                  ? "Đã đến"
                  : next === "IN_PROGRESS"
                  ? "Khám"
                  : "Hoàn tất"}
              </Button>
            )}
            {record.status !== "COMPLETED" && record.status !== "ABSENT" && (
              <Button
                size="small"
                danger
                onClick={() => handleSetAbsent(record.id)}
                icon={<UserX size={14} />}
              >
                Vắng
              </Button>
            )}
          </div>
        );
      },
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