import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  PlusCircle,
  User,
  Clock,
  Stethoscope,
} from "lucide-react";

import { Button, Col, Input, Row, Select, Form } from "antd";

const { Option } = Select;

const mockAppointments = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    date: "2025-06-21",
    time: "09:00-10:00",
    doctorName: "BS. Trần Văn B",
    service: "Tư vấn điều trị",
    status: "Chưa đến",
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    date: "2025-06-21",
    time: "10:00-11:00",
    doctorName: "BS. Nguyễn Văn C",
    service: "Lấy thuốc ARV",
    status: "Đã đến",
  },
];

const TABS = ["Tất cả", "Chưa đến", "Đã đến", "Đang khám", "Hoàn tất", "Vắng"];
const STATUS_FLOW = ["Chưa đến", "Đã đến", "Đang khám", "Hoàn tất"];

const doctors = [
  "BS. Trần Văn B",
  "BS. Nguyễn Văn C",
  "BS. Phạm Thị D",
];

const timeSlots = [
  { value: "08:00-09:00", label: "08:00-09:00" },
  { value: "09:00-10:00", label: "09:00-10:00" },
  { value: "10:00-11:00", label: "10:00-11:00" },
  { value: "13:00-14:00", label: "13:00-14:00" },
  { value: "14:00-15:00", label: "14:00-15:00" },
];

export default function StaffAppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Tất cả");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setAppointments(mockAppointments);
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  const handleUpdateStatus = (id) => {
    setAppointments((prev) =>
      prev.map((appt) => {
        if (appt.id !== id) return appt;
        const currentIndex = STATUS_FLOW.indexOf(appt.status);
        if (currentIndex < STATUS_FLOW.length - 1) {
          return { ...appt, status: STATUS_FLOW[currentIndex + 1] };
        }
        return appt;
      })
    );
  };

  const handleSetAbsent = (id) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status: "Vắng" } : appt))
    );
  };

  const filteredAppointments = appointments.filter((appt) => {
    const dateMatch = appt.date === selectedDate;
    const statusMatch = selectedTab === "Tất cả" || appt.status === selectedTab;
    return dateMatch && statusMatch;
  });

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
        Quản Lý Lịch Hẹn Bệnh Nhân
      </h1>

      {/* Ngày và Tabs */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <label className="font-semibold text-red-700">Ngày:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-full font-medium border ${selectedTab === tab
                ? "bg-red-600 text-white"
                : "bg-white text-red-700 border-red-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Danh sách lịch hẹn */}
      <div className="overflow-x-auto">
        {filteredAppointments.length === 0 ? (
          <p className="text-center text-red-600 font-medium mt-4">
            Không có lịch hẹn.
          </p>
        ) : (
          <table className="w-full table-auto bg-white border border-red-300 rounded shadow">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="p-3">Họ tên</th>
                <th className="p-3">Giờ</th>
                <th className="p-3">Bác sĩ</th>
                <th className="p-3">Dịch vụ</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt) => (
                <tr
                  key={appt.id}
                  className="border-t text-center hover:bg-red-50"
                >
                  <td className="p-3">{appt.fullName}</td>
                  <td className="p-3">{appt.time}</td>
                  <td className="p-3">{appt.doctorName}</td>
                  <td className="p-3">{appt.service}</td>
                  <td
                    className={`p-3 font-semibold ${appt.status === "Vắng"
                        ? "text-red-600"
                        : appt.status === "Hoàn tất"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                  >
                    {appt.status}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      {appt.status !== "Hoàn tất" && appt.status !== "Vắng" && (
                        <button
                          onClick={() => handleUpdateStatus(appt.id)}
                          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          <CheckCircle size={16} />
                          Tiếp theo
                        </button>
                      )}
                      {appt.status !== "Vắng" && appt.status !== "Hoàn tất" && (
                        <button
                          onClick={() => handleSetAbsent(appt.id)}
                          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          <XCircle size={16} />
                          Vắng
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form thêm bệnh nhân mới */}
      <div className="mt-10 max-w-5xl mx-auto bg-gradient-to-br from-red-50 to-white p-10 rounded-lg shadow-lg border-2 border-red-200 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.5s]">
        <h2 className="text-xl font-semibold text-red-700 mb-6 flex items-center gap-2">
          <PlusCircle className="w-6 h-6" />
          Thêm bệnh nhân mới
        </h2>
        <Form
          layout="vertical"
          onFinish={(values) => {
            const newId =
              appointments.length > 0
                ? Math.max(...appointments.map((a) => a.id)) + 1
                : 1;
            const newAppt = {
              id: newId,
              ...values,
              status: "Chưa đến",
            };
            setAppointments((prev) => [...prev, newAppt]);
          }}
          className="space-y-4"
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Họ tên bệnh nhân"
                name="fullName"
                rules={[{ required: true, message: "Họ tên là bắt buộc" }]}
              >
                <Input
                  prefix={<User className="w-5 h-5 text-gray-400" />}
                  placeholder="Nhập họ tên"
                  className="border border-gray-300 rounded-lg"
                  style={{
                    height: "42px",
                    padding: "0 12px",
                    lineHeight: "42px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Ngày khám"
                name="date"
                rules={[{ required: true, message: "Ngày hẹn là bắt buộc" }]}
              >
                <Input
                  type="date"
                  className="border border-gray-300 rounded-lg"
                  style={{
                    height: "42px",
                    padding: "0 12px",
                    lineHeight: "42px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Giờ hẹn"
                name="time"
                rules={[{ required: true, message: "Giờ hẹn là bắt buộc" }]}
              >
                <div className="flex items-center border border-gray-300 rounded-lg px-3 h-[42px] focus-within:ring-2 focus-within:ring-red-500">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <Select
                    placeholder="Chọn giờ hẹn"
                    className="flex-1 border-none shadow-none"
                    size="large"
                    allowClear
                    bordered={false}
                  >
                    {timeSlots.map((slot) => (
                      <Option key={slot.value} value={slot.value}>
                        {slot.label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Bác sĩ phụ trách"
                name="doctorName"
                rules={[{ required: true, message: "Vui lòng chọn bác sĩ" }]}
              >
                <Select
                  placeholder="Chọn bác sĩ"
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  style={{ height: "42px" }}
                >
                  {doctors.map((doc) => (
                    <Option key={doc} value={doc}>
                      {doc}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Dịch vụ cụ thể"
                name="service"
                rules={[{ required: true, message: "Dịch vụ là bắt buộc" }]}
              >
                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500 relative z-10 h-[42px] px-3">
                  <Stethoscope className="w-5 h-5 text-gray-400 mr-2" />
                  <Select
                    placeholder="Chọn dịch vụ"
                    bordered={false}
                    className="w-full focus:outline-none rounded-lg shadow-none"
                    dropdownStyle={{ zIndex: 1050 }}
                  >
                    <Select.OptGroup label="Khám lần đầu">
                      <Select.Option value="Khám HIV cơ bản">
                        Khám HIV cơ bản
                      </Select.Option>
                      <Select.Option value="Xét nghiệm tải lượng virus HIV">
                        Xét nghiệm tải lượng virus HIV
                      </Select.Option>
                      <Select.Option value="Xét nghiệm CD4">
                        Xét nghiệm CD4
                      </Select.Option>
                      <Select.Option value="Tư vấn và điều trị dự phòng">
                        Tư vấn và điều trị dự phòng
                      </Select.Option>
                    </Select.OptGroup>
                    <Select.OptGroup label="Tái khám">
                      <Select.Option value="Khám tái khám HIV">
                        Khám tái khám HIV
                      </Select.Option>
                      <Select.Option value="Lấy thuốc ARV">Lấy thuốc ARV</Select.Option>
                    </Select.OptGroup>
                  </Select>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700 rounded-md transition-all duration-300"
              style={{
                height: "42px",
                lineHeight: "42px",
                padding: "0 16px",
              }}
            >
              Thêm bệnh nhân
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
