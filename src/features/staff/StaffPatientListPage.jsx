import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  User,
  Phone,
  MapPin,
  Venus,
  Mars,
  Activity,
  CalendarDays,
  Mail,
} from "lucide-react";
import { Col, Input, Row, Form, Select, message, Modal, Button } from "antd";

const { Option } = Select;

export default function StaffPatientListPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const genderOptions = ["Nam", "Nữ", "Khác"];

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/patients", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!res.ok) throw new Error("Không thể tải danh sách bệnh nhân");

      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi tải danh sách bệnh nhân");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async (values) => {
    try {
      // Sửa payload để khớp với backend
      const payload = {
        fullName: values.fullName,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth, // Đổi từ birthDate thành dateOfBirth
        phoneNumber: values.phoneNumber, // Đổi từ phone thành phoneNumber
        address: values.address,
        email: values.email, // Thêm trường email
      };

      const res = await fetch("http://localhost:8080/api/staff/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "Không thể thêm bệnh nhân");
      }

      message.success("Đã thêm bệnh nhân mới!");
      setModalVisible(false);
      fetchPatients();
    } catch (error) {
      console.error(error);
      message.error(error.message || "Thêm bệnh nhân thất bại");
    }
  };

  const renderGender = (gender) => {
    const g = (gender || "").toUpperCase();
    if (g === "NAM") {
      return (
        <span className="text-blue-500 flex items-center justify-center gap-1">
          <Mars size={14} /> Nam
        </span>
      );
    } else if (g === "NỮ" || g === "NU") {
      return (
        <span className="text-pink-500 flex items-center justify-center gap-1">
          <Venus size={14} /> Nữ
        </span>
      );
    } else {
      return <span>Khác</span>;
    }
  };

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
        Danh Sách Bệnh Nhân
      </h1>

      <div className="mb-6 flex justify-end">
        <Button
          type="text"
          icon={<PlusCircle className="text-white" />}
          onClick={() => setModalVisible(true)}
          className="bg-red-600 text-white hover:bg-red-700 rounded-md shadow-sm"
        >
          Thêm bệnh nhân
        </Button>
      </div>

      <Modal
        title="Thêm Bệnh Nhân"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
        width={650}
      >
        <Form layout="vertical" onFinish={handleAddPatient} size="large">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Họ tên"
                name="fullName"
                rules={[{ required: true, message: "Họ tên là bắt buộc" }]}
              >
                <Input
                  prefix={<User />}
                  placeholder="Nhập họ tên"
                  className="rounded-md"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email là bắt buộc" },
                  { type: "email", message: "Email không hợp lệ" }
                ]}
              >
                <Input
                  prefix={<Mail />}
                  placeholder="Nhập email"
                  className="rounded-md"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính" className="rounded-md">
                  {genderOptions.map((g) => (
                    <Option key={g} value={g}>{g}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[{ required: true, message: "Ngày sinh là bắt buộc" }]}
              >
                <Input type="date" prefix={<CalendarDays />} className="rounded-md" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="SĐT"
                name="phoneNumber"
                rules={[{ required: true, message: "Số điện thoại là bắt buộc" }]}
              >
                <Input
                  prefix={<Phone />}
                  placeholder="Nhập số điện thoại"
                  className="rounded-md"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Địa chỉ là bắt buộc" }]}
              >
                <Input
                  prefix={<MapPin />}
                  placeholder="Nhập địa chỉ"
                  className="rounded-md"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="text"
              htmlType="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white"
              size="large"
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {loading ? (
        <p className="text-center text-red-600">Đang tải dữ liệu...</p>
      ) : patients.length === 0 ? (
        <p className="text-center text-red-600">Chưa có bệnh nhân nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white border border-red-300 rounded shadow">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-3">Họ tên</th>
                <th className="p-3">Email</th>
                <th className="p-3">Giới tính</th>
                <th className="p-3">Ngày sinh</th>
                <th className="p-3">SĐT</th>
                <th className="p-3">Địa chỉ</th>
                <th className="p-3">Tình trạng HIV</th>
                <th className="p-3">Ngày điều trị</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, index) => (
                <tr key={index} className="border-t text-center hover:bg-red-50">
                  <td className="p-3">{p.fullName || "N/A"}</td>
                  <td className="p-3">{p.email || "N/A"}</td>
                  <td className="p-3">{renderGender(p.gender)}</td>
                  <td className="p-3">
                    {p.birthDate ? new Date(p.birthDate).toLocaleDateString("vi-VN") : "N/A"}
                  </td>
                  <td className="p-3">{p.phone || "N/A"}</td>
                  <td className="p-3">{p.address || "N/A"}</td>
                  <td className="p-3">{p.hivStatus || "N/A"}</td>
                  <td className="p-3">
                    {p.treatmentStartDate
                      ? new Date(p.treatmentStartDate).toLocaleDateString("vi-VN")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}