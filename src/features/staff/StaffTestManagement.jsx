import React, { useEffect, useState } from "react";
import { Table, Input, Typography, Select, Space, message } from "antd";
import { Button } from "antd";


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
      const token = user?.token;
      if (!token) throw new Error("Vui lòng đăng nhập");
      const response = await fetch("http://localhost:8080/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const profiles = await response.json();
        const profileMap = {};
        profiles.forEach((profile) => {
          profileMap[profile.id] = profile.fullName;
        });
        setPatientProfiles(profileMap);
        console.log("Patient profiles loaded:", profileMap);
      }
    } catch (error) {
      console.error("Error fetching patient profiles:", error);
    }
  };


  const fetchTestResults = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) throw new Error("Vui lòng đăng nhập");
      const resp = await fetch("http://localhost:8080/api/test-results", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(`Failed: ${resp.status} - ${errorText}`);
      }
      const data = await resp.json();
      console.log("Test results loaded:", data);


      data.forEach((test) => {
        console.log(
          `Test ID: ${test.id}, Patient ID: ${test.patientId}, Patient Name: ${test.patientName}`
        );
      });


      setTests(data);
    } catch (error) {
      console.error(error);
      message.error(`Không tải được danh sách: ${error.message}`);
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
      const token = user?.token;
      if (!token) throw new Error("Vui lòng đăng nhập");
      const res = await fetch(
        `http://localhost:8080/api/test-results/${id}/status?status=${newStatus}`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Update failed: ${res.status} - ${errorText}`);
      }
      message.success("Cập nhật trạng thái thành công");
      fetchTestResults();
    } catch (error) {
      console.error(error);
      message.error("Cập nhật trạng thái thất bại: " + error.message);
    }
  };


  const handleResultChange = async (id, result, resultNote = "") => {
    setUpdating(id);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) throw new Error("Vui lòng đăng nhập");


      console.log(`Updating test result ID: ${id}`);
      console.log(`Result value: ${result}`);
      console.log(`Result note: ${resultNote}`);


      const params = new URLSearchParams();
      if (result !== undefined && result !== null) {
        params.append("resultValue", result);
      }
      if (
        resultNote !== undefined &&
        resultNote !== null &&
        resultNote.trim()
      ) {
        params.append("resultNote", resultNote.trim());
      }


      const res = await fetch(
        `http://localhost:8080/api/test-results/${id}/result?${params.toString()}`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Update failed: ${res.status} - ${errorText}`);
      }
      message.success("Đã lưu kết quả");
      fetchTestResults();
    } catch (error) {
      console.error(error);
      message.error("Lưu kết quả thất bại: " + error.message);
    } finally {
      setUpdating(null);
    }
  };


  const filteredTests = tests.filter((test) => {
    const patientName =
      patientProfiles[test.patientId] || test.patientName || "";
    const status = test.status || "";
    return (
      patientName.toLowerCase().includes(searchTerm) ||
      status.toLowerCase().includes(searchTerm) ||
      (test.resultDate || "").toLowerCase().includes(searchTerm)
    );
  });


  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: "patientName",
      key: "patientName",
      render: (text, rec) => {
        const displayName = patientProfiles[rec.patientId] || text || "Chưa có";
        console.log(
          `Rendering patient for test ${rec.id}: ${displayName} (Patient ID: ${rec.patientId})`
        );
        return displayName;
      },
    },
    {
      title: "Xét nghiệm",
      dataIndex: "testCategoryName",
      key: "testCategoryName",
      render: (t) => t || "Chưa có",
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (t) => t || "Chưa chỉ định",
    },


    {
      title: "Trạng thái",
      key: "status",
      render: (_, rec) => (
        <Select
          value={rec.status}
          onChange={(v) => handleStatusChange(rec.id, v)}
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
      render: (_, rec) => {
        const edit = editingResults[rec.id] || {};
        return (
          <Space direction="vertical">
            <Space direction="horizontal">
              <Input
                value={edit.value ?? rec.resultValue ?? ""}
                onChange={(e) =>
                  setEditingResults((p) => ({
                    ...p,
                    [rec.id]: {
                      ...p[rec.id],
                      value: e.target.value,
                      note: p[rec.id]?.note ?? rec.resultNote ?? "",
                    },
                  }))
                }
                placeholder="Kết quả"
                disabled={updating === rec.id}
                style={{ width: 250 }}
              />
              <Input
                value={edit.note ?? rec.resultNote ?? ""}
                onChange={(e) =>
                  setEditingResults((p) => ({
                    ...p,
                    [rec.id]: {
                      ...p[rec.id],
                      note: e.target.value,
                      value: p[rec.id]?.value ?? rec.resultValue ?? "",
                    },
                  }))
                }
                placeholder="Ghi chú"
                disabled={updating === rec.id}
                style={{ width: 250 }}
              />
              <Button
                danger
                onClick={() =>
                  handleResultChange(
                    rec.id,
                    editingResults[rec.id]?.value || "",
                    editingResults[rec.id]?.note || ""
                  )
                }
                loading={updating === rec.id}
              >
                Confirm
              </Button>
            </Space>
            {updating === rec.id && <span>Đang lưu...</span>}
          </Space>
        );
      },
    },
  ];


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
        Quản lý kết quả xét nghiệm</h1>
      <Input.Search
        placeholder="Tìm kiếm tên bệnh nhân"
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



