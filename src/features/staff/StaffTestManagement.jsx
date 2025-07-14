import React, { useEffect, useState } from "react";
import { Table, Input, Typography, Select, Button, Space, message } from "antd";

const { Title } = Typography;
const { Option } = Select;

export default function StaffTestManagement() {
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null); // ID đang cập nhật kết quả
  const [editingResults, setEditingResults] = useState({}); // lưu kết quả đang nhập

  // Gọi API lấy danh sách tất cả kết quả xét nghiệm
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
      console.log("Dữ liệu nhận được:", data);
      setTests(data);
    } catch (error) {
      console.error("Error fetching test results:", error);
      message.error(`Không thể tải danh sách xét nghiệm: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Gọi API cập nhật trạng thái
  const handleStatusChange = async (id, newStatus) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) throw new Error("Vui lòng đăng nhập");
      const response = await fetch(`http://localhost:8080/api/test-results/${id}/status?status=${newStatus}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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

  // Gọi API cập nhật kết quả
  const handleResultChange = async (id, result) => {
    setUpdating(id);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) throw new Error("Vui lòng đăng nhập");
      const response = await fetch(`http://localhost:8080/api/test-results/${id}/result`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ resultValue: result }),
      });
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

  // Lọc danh sách theo tìm kiếm
  const filteredTests = tests.filter(
    (test) =>
      test.patient?.fullName?.toLowerCase().includes(searchTerm) ||
      test.status?.toLowerCase().includes(searchTerm)
  );

  const columns = [
    {
      title: "Bệnh nhân",
      key: "patientName",
      render: (text, record) => record.patient?.fullName || "Chưa có",
    },
    {
      title: "Xét nghiệm",
      key: "testName",
      render: (text, record) => record.testCategory?.name || "Chưa có",
    },
    {
      title: "Bác sĩ",
      key: "doctorName",
      render: (text, record) => record.doctor?.fullName || "Chưa chỉ định",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (text, record) => (
        <Select
          value={record.status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 150 }}
        >
          <Option value="PENDING">PENDING</Option>
          <Option value="IN_PROGRESS">IN_PROGRESS</Option>
          <Option value="COMPLETED">COMPLETED</Option>
        </Select>
      ),
    },
    {
      title: "Kết quả",
      key: "result",
      render: (text, record) => (
        <Space>
          <Input
            value={editingResults[record.id] ?? record.resultValue ?? ""}
            onChange={(e) =>
              setEditingResults((prev) => ({
                ...prev,
                [record.id]: e.target.value,
              }))
            }
            onBlur={() =>
              handleResultChange(record.id, editingResults[record.id] || "")
            }
            placeholder="Nhập kết quả"
            disabled={updating === record.id}
            style={{ width: 200 }}
          />
          {updating === record.id && <span>Đang lưu...</span>}
        </Space>
      ),
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
