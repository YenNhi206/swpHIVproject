import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Typography,
  Select,
  Space,
  message,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function StaffTestManagement() {
  const [tests, setTests] = useState([]);
  const [patientProfiles, setPatientProfiles] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);
  const [editingResults, setEditingResults] = useState({});

  const statusOptions = [
    { label: "Đã yêu cầu", value: "REQUESTED" },
    { label: "Đã nhận mẫu", value: "SAMPLE_RECEIVED" },
    { label: "Đang xét nghiệm", value: "IN_PROGRESS" },
    { label: "Hoàn tất", value: "COMPLETED" },
    { label: "Đã hủy", value: "CANCELLED" },
  ];

  const fetchPatientProfiles = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        throw new Error("Vui lòng đăng nhập với vai trò STAFF hoặc ADMIN");
      }
      const token = user.token;
      
      const response = await fetch("http://localhost:8080/api/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const profiles = await response.json();
        const profileMap = {};
        profiles.forEach(profile => {
          profileMap[profile.id] = profile.fullName;
        });
        setPatientProfiles(profileMap);
      }
    } catch (error) {
      console.error("Error fetching patient profiles:", error);
    }
  };

  const fetchTestResults = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        throw new Error("Vui lòng đăng nhập với vai trò STAFF hoặc ADMIN");
      }
      const token = user.token;
      const response = await fetch("http://localhost:8080/api/test-results", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch test results: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error("Error fetching test results:", error);
      message.error(`Không thể tải danh sách xét nghiệm: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientProfiles();
    fetchTestResults();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) throw new Error("Vui lòng đăng nhập");

      const response = await fetch(
        `http://localhost:8080/api/test-results/${id}/status?status=${newStatus}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Update failed: ${response.status} - ${errorText}`);
      }
      message.success("Đã cập nhật trạng thái");
      fetchTestResults();
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Cập nhật trạng thái thất bại: " + error.message);
    }
  };

  const handleResultChange = async (id, result, resultNote = "") => {
    setUpdating(id);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) throw new Error("Vui lòng đăng nhập");

      const params = new URLSearchParams();
      params.append("resultValue", result);
      if (resultNote && resultNote.trim() !== "") {
        params.append("resultNote", resultNote.trim());
      }

      const response = await fetch(
        `http://localhost:8080/api/test-results/${id}/result?${params.toString()}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Update failed: ${response.status} - ${errorText}`);
      }

      message.success("Đã lưu kết quả");
      fetchTestResults();
    } catch (error) {
      console.error("Error updating result:", error);
      message.error("Lưu kết quả thất bại: " + error.message);
    } finally {
      setUpdating(null);
    }
  };

  const filteredTests = tests.filter(
    (test) => {
      const patientName = patientProfiles[test.patientId] || test.patientName || "";
      const status = test.status || "";
      return (
        patientName.toLowerCase().includes(searchTerm) ||
        status.toLowerCase().includes(searchTerm)
      );
    }
  );

  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, record) => {
        // Ưu tiên hiển thị tên thật từ patientProfiles
        const realName = patientProfiles[record.patientId];
        return realName || text || "Chưa có";
      },
    },
    {
      title: "Xét nghiệm",
      dataIndex: "testCategoryName",
      key: "testCategoryName",
      render: (text) => text || "Chưa có",
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (text) => text || "Chưa chỉ định",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record) => (
        <Select
          value={record.status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 180 }}
        >
          {statusOptions.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Kết quả & Ghi chú",
      key: "result",
      render: (text, record) => {
        const editing = editingResults[record.id] || {};
        return (
          <Space direction="vertical">
            <Input
              value={editing.value ?? record.resultValue ?? ""}
              onChange={(e) =>
                setEditingResults((prev) => ({
                  ...prev,
                  [record.id]: {
                    ...prev[record.id],
                    value: e.target.value,
                    note: prev[record.id]?.note ?? record.resultNote ?? "",
                  },
                }))
              }
              onBlur={() =>
                handleResultChange(
                  record.id,
                  editingResults[record.id]?.value || "",
                  editingResults[record.id]?.note || ""
                )
              }
              placeholder="Nhập kết quả"
              disabled={updating === record.id}
              style={{ width: 250 }}
            />
            <Input
              value={editing.note ?? record.resultNote ?? ""}
              onChange={(e) =>
                setEditingResults((prev) => ({
                  ...prev,
                  [record.id]: {
                    ...prev[record.id],
                    note: e.target.value,
                    value: prev[record.id]?.value ?? record.resultValue ?? "",
                  },
                }))
              }
              onBlur={() =>
                handleResultChange(
                  record.id,
                  editingResults[record.id]?.value || "",
                  editingResults[record.id]?.note || ""
                )
              }
              placeholder="Ghi chú (nếu có)"
              disabled={updating === record.id}
              style={{ width: 250 }}
            />
            {updating === record.id && <span>Đang lưu...</span>}
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <Title level={3}>Quản lý xét nghiệm</Title>

      <Input.Search
        placeholder="Tìm kiếm theo tên bệnh nhân hoặc trạng thái"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
        allowClear
      />

      <Table
        loading={loading}
        dataSource={filteredTests}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        bordered
      />
    </div>
  );
}